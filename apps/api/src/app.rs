use axum::{
    Router,
    http::{HeaderName, Request},
};
use tower::ServiceBuilder;
use tower_http::{
    request_id::{MakeRequestUuid, PropagateRequestIdLayer, SetRequestIdLayer},
    trace::TraceLayer,
};
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;
use utoipauto::utoipauto;

use crate::{routes, state::AppState};

// Rust-analyzer does not work properly with this macro even though it compiles fine.
#[utoipauto]
#[derive(OpenApi)]
#[openapi(
    tags((name = "contact", description = "Contact form operations"))
)]
pub struct ApiDoc;

pub fn create_app(state: AppState) -> Router {
    let trace_layer = TraceLayer::new_for_http().make_span_with(|request: &Request<_>| {
        let request_id = request
            .headers()
            .get(HeaderName::from_static("x-request-id"))
            .and_then(|value| value.to_str().ok())
            // this should never happen because the SetRequestIdLayer should always set a valid UUID, but we want to be safe
            .unwrap_or("missing");

        let span = tracing::info_span!("request", request_id = %request_id);
        tracing::info!(
            parent: &span,
            method = %request.method(),
            uri = %request.uri(),
            version = ?request.version(),
            "incoming request",
        );
        span
    });

    let middleware = ServiceBuilder::new()
        .layer(SetRequestIdLayer::new(
            HeaderName::from_static("x-request-id"),
            MakeRequestUuid,
        ))
        .layer(PropagateRequestIdLayer::new(HeaderName::from_static(
            "x-request-id",
        )))
        .layer(trace_layer);

    Router::new()
        .merge(routes::router())
        .merge(SwaggerUi::new("/swagger-ui").url("/api-docs/openapi.json", ApiDoc::openapi()))
        .layer(middleware)
        .with_state(state)
}
