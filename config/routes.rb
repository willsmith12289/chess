Rails.application.routes.draw do
  root 'game#index'
  resources :pieces
end
