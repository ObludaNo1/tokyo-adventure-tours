use axum::{Json, Router, extract::State, routing::post};
use tracing::info;

use crate::{
    error::AppError,
    models::contact::{ContactRequest, ContactResponse, ErrorResponse},
    state::AppState,
};

#[utoipa::path(
    post,
    path = "/contact",
    tag = "contact",
    request_body = ContactRequest,
    responses(
        (status = 200, description = "Contact request processed successfully", body = ContactResponse),
        (status = 400, description = "Invalid contact request", body = ErrorResponse),
        (status = 500, description = "Internal server error", body = ErrorResponse),
        (status = 502, description = "Email delivery failed", body = ErrorResponse),
    )
)]
pub async fn contact_handler(
    State(state): State<AppState>,
    Json(payload): Json<ContactRequest>,
) -> Result<Json<ContactResponse>, AppError> {
    info!("Received contact request");

    let contact_info = payload.try_validate()?;
    state.contact_service.handle_contact(contact_info).await?;

    Ok(Json(ContactResponse))
}

pub fn router() -> Router<AppState> {
    Router::new().route("/contact", post(contact_handler))
}
