use axum::Router;
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
    Router::new()
        .merge(routes::router())
        .merge(SwaggerUi::new("/swagger-ui").url("/api-docs/openapi.json", ApiDoc::openapi()))
        .with_state(state)
}
