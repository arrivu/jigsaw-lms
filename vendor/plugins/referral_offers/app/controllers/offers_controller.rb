class OffersController < ApplicationController

  before_filter :require_context
  add_crumb(proc { t('#crumbs.offers', "Rewards")}) { |c| c.send :named_context_url, c.instance_variable_get("@context"), :context_offers_url }
  before_filter { |c| c.active_tab = "Rewards" }

  def new
    @offer = Offer.new
  end

  def create

    @offer = Offer.new(params[:offer])
    @offer.account_id=@domain_root_account.id
    if @offer.save!
      redirect_to account_offers_path
    end
  end

  def edit
    @offer = Offer.find(params[:id])
  end


  def update
    @offer = Offer.find(params[:id])
    @offer.account_id=@domain_root_account.id

    if @offer.update_attributes(params[:offer])
      #flash[:success] ="Successfully Updated Category."
      redirect_to account_offers_path
    end

  end

  def show
    @offer = Offer.find(params[:id])
  end
  def destroy
    @offer = Offer.find(params[:id])
    @offer.destroy
    #flash[:success] = "Successfully Destroyed Category."
    redirect_to account_offers_path
  end

  def index
    @offers = Offer.all
  end
end

