class Api::ArtistsController < ApplicationController
    def index
        @artists = Artist.all
        render :index
    end

    def create
        @artist = Artist.new(artist_params)

        if @artist.save
            login!(@artist)
            render :show
        else
            render json: @artist.errors.full_messages, status: 422
        end
    end

    def show
        @artist = Artist.includes(:songs).find(params[:id])
        
        if @artist
            render :show
        else
            render json: @artist.errors.full_messages, status: 404
        end
    end

    private
    def artist_params
        params.require(:artist).permit(:username, :email, :password)
    end
end
