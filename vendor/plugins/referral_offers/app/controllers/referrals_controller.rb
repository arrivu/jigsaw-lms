class ReferralsController < ApplicationController

  def new
    @referral = Referral.new
  end

  def create
    @referral = Referral.new(params[:@referral])

  end

  def url_for_referral(referral, params = {})
    host =  'http://localhost:3000/'
    "#{host}#{referral.short_url}?#{params.to_query}"
  end

  def edit
  end

  def show
  end

  def index

  end

  def my_rewards
  end

end
