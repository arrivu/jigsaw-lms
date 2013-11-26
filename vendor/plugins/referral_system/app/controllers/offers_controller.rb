class OffersController < ApplicationController

  def new
    @offer = Offer.new()
  end

  def create
    @offer = Offer.new(params[:offer])

    if @offer.save
      flash[:success] = "Created Sucessfully"

    end
  end



  def edit
  end

  def show
  end

  def index
  end

end
