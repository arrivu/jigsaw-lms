class TermsAndConditionsController < ApplicationController
  include ApplicationHelper
  before_filter :require_context
  skip_before_filter :check_for_terms_and_conditions

  def create
    return unless authorized_action(@account, @current_user, [:manage_account_settings])
    respond_to do |format|
      if @account.terms_and_condition
        @terms_condition = @account.terms_and_condition.update_attributes(terms_and_conditions: params[:terms_and_conditions])
      else
        @terms_condition = @account.build_terms_and_condition(terms_and_conditions: params[:terms_and_conditions])
        @terms_condition.save!
      end

      if @terms_condition
        format.json {render :json => @terms_condition}
      else
        format.json { render :json => @terms_condition.errors, :status => :bad_request }
      end
    end
  end

  def show
    @terms = TermsAndCondition.find_by_account_id(@account.id)
  end

  def update
    @current_user.time_zone = params[:terms_and_condition][:time_zone]
    @current_pseudonym.settings[:is_terms_and_conditions_accepted] = true
    if @current_pseudonym.save!
      @current_user.save!
       cc = CommunicationChannel.find_by_user_id(@current_user.id)
       unless cc.nil?
        cc.workflow_state = "active"
       end
      favourites
    end
  end
end
