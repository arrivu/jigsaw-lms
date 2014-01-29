class ReferralsController < ApplicationController
  include ReferralsHelper
  before_filter :require_user, :except => [:referree_register,:update_referree]
  before_filter :require_context, :except => [:referree_register,:update_referree]

   def create_reference
     @reward = Reward.find_by_metadata_and_metadata_type_and_status(@context.id.to_s, @context.class.name, Reward::STATUS_ACTIVE)
     if @reward
       @referral = @reward.referrals.build(pseudonym_id: @current_pseudonym.id,email_text: @reward.email_template_txt,email_subject: @reward.email_subject)
       create_social_references
       @referral.save!
     else
       @reward = Reward.find_by_metadata_and_metadata_type_and_status(@domain_root_account.id.to_s, @domain_root_account.class.name, Reward::STATUS_ACTIVE)
       if @reward
         @referral = @reward.referrals.build(pseudonym_id: @current_pseudonym.id,email_subject: @reward.email_subject,email_text: @reward.email_template_txt )
         create_social_references
         @referral.save!
        end
     end
     js_env(COURSE_REFERRAL: @referral.to_json)
     js_env(COURSE_REWARD: @reward.to_json)
     js_env(COURSE_REFERENCE_FB: @reference_fb.to_json)
     js_env(COURSE_REFERENCE_TW: @reference_tw.to_json)
     js_env(COURSE_REFERENCE_LI: @reference_li.to_json)
     js_env(COURSE_REFERENCE_GO: @reference_go.to_json)
     js_env(COURSE_REFERENCE_GL: @reference_gl.to_json)
     js_env(DOMAIN_URL: @domain_url.to_json)
   end



  def update
    @email_references = []
    @reward = Reward.find_by_metadata_and_metadata_type_and_status(@context.id.to_s, @context.class.name, Reward::STATUS_ACTIVE)
    @referral = Referral.find(params[:id])
    @referral.email_subject = params[:mail_subject]
    @referral.email_text = params[:mail_text]
    referral_emails = params[:valid_emails]
    referral_emails.each do |email|
      @email_references << @referral.references.build(provider: email)
    end
    @referral.save!
    send_referral_emails(@email_references,@referral)
    respond_to do |format|
        format.json {
          render(:json => @email_references)
        }
    end
   end

  def send_referral_emails(email_references,referral)
    domains = HostUrl.context_hosts(@domain_root_account)
    @domain_url =  "#{HostUrl.protocol}://#{domains.first}/rr/"
    email_references.each do |email_reference|
      m = Message.new
      m.to = email_reference.provider
      m.subject = referral.email_subject
      m.html_body = referral.email_text
      m.body = @domain_url+"#{email_reference.short_url_code}"
      m.save!
      Mailer.send_later(:deliver_send_referral_email,m)
    end
  end


  def index
    add_crumb("Referrals", named_context_url(@context, :context_referrals_url))
    @active_tab = "Referrals"
    create_reference
    get_all_references
  end

  def referree_register
    @reference = Reference.find_by_short_url_code(params[:short_url_code])
    if @reference
      @referral = @reference.referral
      @reward = @referral.reward
      @reference.update_attributes(status: Reference::STATUS_VISIT)
    else
      #The entered short url code is junk so find for account level reward
      #Once account level reward is there we have to look for the referral,referrence
      @reward = Reward.find_by_metadata_and_metadata_type_and_status(@domain_root_account.id.to_s,
                                                                @domain_root_account.class.name, Reward::STATUS_ACTIVE)
      if @reward
        @referral = Referral.find_or_create_by_reward_id_and_pseudonym_id(reward_id: @reward.id,
                                                            pseudonym_id: Account.site_admin.pseudonyms.active.first,
                                                            email_subject: @reward.email_subject ,
                                                            email_text: @reward.email_template_txt )
        @reference = Reference.find_or_create_by_referral_id_and_short_url_code_and_provider(referral_id: @referral.id,
                                                                                short_url_code: params[:short_url_code],
                                                                                provider: Reference::SELF)
      end
    end
   social_providers = [Reference::FACEBOOK,Reference::GOOGLE,Reference::TWITTER,Reference::LINKEDIN,Reference::ACCOUNT,Reference::SELF,Reference::GLOBAL]
    unless social_providers.include?(@reference.try(:provider))
      @reference_email = @reference.try(:provider)
    end
  end


  def update_referree
    if params[:referree]
      @reference = Reference.find(params[:referree][:reference_id])
      @referral = @reference.referral
      @reward = @referral.reward
      @reference.update_attributes(status: Reference::STATUS_REGISTER)
      @referree = Referree.find_by_reward_id_and_email(@reward.id,params[:referree][:email])
      if @referree.nil?
          @coupon = generate_coupon(@reward,@reference.id.to_s)
          @referree = Referree.find_or_create_by_reference_id_and_name_and_email(@reference.id,params[:referree][:name],
                                                                     params[:referree][:email],
                                                                     phone: params[:referree][:phone],
                                                                     referral_email: @reference.provider,
                                                                     status: ReferrerCoupon::STATUS_WAIT_FOR_ENROLL,
                                                                     coupon_id: @coupon.id,
                                                                     coupon_code: @coupon.alpha_code,
                                                                     expiry_date: @reward.referree_expiry_date,
                                                                     reward_id: @reward.id)

          @coupon2 = generate_coupon(@reward,@reference.id.to_s) #referrer coupon

          ReferrerCoupon.find_or_create_by_reference_id_and_referree_id_and_coupon_id(@reference.id,@referree.id, @coupon2.id,
                                                                                   status: ReferrerCoupon::STATUS_WAIT_FOR_ENROLL,expiry_date: @coupon2.expiration,
                                                                                   coupon_code: @coupon2.alpha_code,
                                                                                   expiry_date: @reward.referrer_expiry_date)
        end
      end
    end

    def generate_coupon(reward,metadata)
       Coupon.create!(metadata: metadata, name: reward.name,description: reward.description,
                               how_many: 1,expiration: reward.referree_expiry_date,category_one: "Reward",
                               amount_one: reward.referree_amount,percentage_one: reward.referree_percentage,
                               amount_two: reward.referrer_amount,percentage_two: reward.referrer_percentage,
                               alpha_mask: reward.alpha_mask,alpha_code: Coupon.generate_alpha_code(reward.alpha_mask))
    end


  def get_all_references
    @references =[]
    @my_rewards=[]
    @referrals = @current_pseudonym.referrals
    @referrals.each do |referral|
      referral.references.not_in_social.each do |reference|
      @references << reference
      end
      referral.references.each do |reference|
      reference.referrer_coupons.active.each do |referrer_coupon|
        @my_rewards << referrer_coupon
      end
      end
    end
    js_env(MY_REWARDS: @my_rewards.to_json(:include => :referree))
    js_env(MY_REFERENCES: @references.to_json)
  end

  def create_social_references
    domains = HostUrl.context_hosts(@domain_root_account)
    @domain_url =  "#{HostUrl.protocol}://#{domains.first}/rr/"
    @reference_fb = @referral.references.build(provider: Reference::FACEBOOK)
    @reference_tw = @referral.references.build(provider: Reference::TWITTER)
    @reference_li = @referral.references.build(provider: Reference::LINKEDIN)
    @reference_go = @referral.references.build( provider: Reference::GOOGLE)
    @reference_gl = @referral.references.build(provider: Reference::GLOBAL)

  end

  def get_referrees
    list_rewards
  end



  def update_referrees
   if params[:type] == "Referee"
     @coupon_context = Referree.find_by_coupon_code(params[:coupon_code])
   elsif params[:type] == "Referrer"
     @coupon_context =ReferrerCoupon.find_by_coupon_code(params[:coupon_code])
   end
      respond_to do |format|
        if @coupon_context.update_attributes(status: params[:status])
          if params[:type] == "Referee"
            if params[:status] == Referree::STATUS_USED
              @coupon_context.referrer_coupon.update_attributes(status: ReferrerCoupon::STATUS_ACTIVE )
            else
              @coupon_context.referrer_coupon.update_attributes(status: ReferrerCoupon::STATUS_WAIT_FOR_ENROLL )
            end
          end

          format.json { render :json => @coupon_context }
        else
          format.json { render :json => @coupon_context.errors.to_json ,:status => :bad_request}
        end
      end
  end

 end

