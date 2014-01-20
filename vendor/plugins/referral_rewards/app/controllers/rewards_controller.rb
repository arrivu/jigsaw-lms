class RewardsController < ApplicationController
  before_filter :require_user
  before_filter :require_context
  add_crumb(proc { t('#crumbs.rewards', "Rewards")}) { |c| c.send :named_context_url, c.instance_variable_get("@context"), :context_rewards_url }
  before_filter { |c| c.active_tab = "Rewards" }

  def new
    @reward = Reward.new
  end

  def create
    oldrewards =  Reward.where(status: Reward::STATUS_ACTIVE , metadata_type: @context.class.name, metadata: @context.id.to_s)
    oldrewards.each do |oldreward|
      oldreward.update_attributes(status: Reward::STATUS_INACTIVE)
    end

    @reward = Reward.new(name:params['name'],description:params['description'],expiry_date:params['expiry_date'],how_many:params['how_many'],referrer_amount:params['referrer_amount'],referrer_percentage:params['referrer_percentage'],
                         referrer_expiry_date:params['referrer_expiry_date'],referree_amount:params['referree_amount'],referree_percentage:params['referree_percentage'],referree_expiry_date:params['referree_expiry_date'],email_subject:params['email_subject'],email_template_txt:params['email_template_txt'],
                         alpha_mask:params['alpha_mask'],status:params['status'])
    @reward.account_id = @domain_root_account.id
    @reward.pseudonym_id = @current_pseudonym.id
    @reward.metadata = @context.id
    @reward.metadata_type = @context.class.name
    @reward.status = "active"
    respond_to do |format|
      if @reward.save
         format.json {render :json => @reward.to_json}
      else
         format.json { render :json => @reward.errors.to_json, :status => :bad_request }
      end
    end
  end
  def edit
    @reward = Reward.find(params[:id])
  end


  def update
    @reward = Reward.find(params[:id])

      respond_to do |format|
        @reward = @reward.update_attributes(name:params['name'],description:params['description'],expiry_date:params['expiry_date'],how_many:params['how_many'],referrer_amount:params['referrer_amount'],referrer_percentage:params['referrer_percentage'],
                                            referrer_expiry_date:params['referrer_expiry_date'],referree_amount:params['referree_amount'],referree_percentage:params['referree_percentage'],referree_expiry_date:params['referree_expiry_date'],email_subject:params['email_subject'],email_template_txt:params['email_template_txt'],
                                            alpha_mask:params['alpha_mask'],status:params['status'])
        if @reward

            format.json { render :json => @reward }

        else
          format.json { render :json => @reward.errors.to_json, :status => :bad_request }
        end
      end
  end

  def show
    @reward = Reward.find(params[:id])
  end
  def destroy
    @reward = Reward.find(params[:id])

    respond_to do |format|

      if @reward.destroy

        format.json { render :json => @reward }

      else
        format.json { render :json => @reward.errors.to_json, :status => :bad_request }
      end
    end
  end

  def index

    respond_to do |format|
      @rewards = Reward.where(metadata: @context.id.to_s, metadata_type: @context.class.name)
      format.json {render :json => @rewards.map(&:attributes).to_json}
    end
  end
end

