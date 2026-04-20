mod app;
mod email;
mod env_keys;
mod error;
mod models;
mod routes;
mod services;
mod state;

use std::{env, net::SocketAddr, sync::Arc};

use dotenvy::dotenv;
use email::sender::EmailSender;
use env_keys::{API_HOST, API_PORT};
use services::contact_service::ContactService;
use state::AppState;
use tokio::net::TcpListener;
use tracing::{error, info};
use tracing_subscriber::fmt::format::FmtSpan;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "api=info,axum=info".into()),
        )
        .with(tracing_subscriber::fmt::layer().with_span_events(FmtSpan::NEW | FmtSpan::CLOSE))
        .init();

    dotenv().inspect_err(|e| error!(error = %e, "Failed to load .env file"))?;

    let host = env::var(API_HOST).unwrap_or_else(|_| "0.0.0.0".to_string());
    let port = env::var(API_PORT)
        .ok()
        .and_then(|value| value.parse::<u16>().ok())
        .unwrap_or(3000);
    let address: SocketAddr = format!("{host}:{port}")
        .parse()
        .map_err(|error_value| Box::new(error_value) as Box<dyn std::error::Error>)?;

    let email_sender = EmailSender::from_env()
        .map_err(|error_value| Box::new(error_value) as Box<dyn std::error::Error>)?;
    let contact_service = Arc::new(ContactService::new(email_sender));
    let state = AppState::new(contact_service);
    let app = app::create_app(state);

    let listener = TcpListener::bind(address)
        .await
        .map_err(|error_value| Box::new(error_value) as Box<dyn std::error::Error>)?;
    info!(address = %address, "Starting API server");

    axum::serve(listener, app).await.map_err(|error_value| {
        error!(error = %error_value, "Server terminated unexpectedly");
        Box::new(error_value) as Box<dyn std::error::Error>
    })?;

    Ok(())
}
