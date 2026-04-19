pub mod contact;

use axum::Router;

use crate::state::AppState;

pub fn router() -> Router<AppState> {
    Router::new().merge(contact::router())
}