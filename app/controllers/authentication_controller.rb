class AuthenticationController < ApplicationController
  include ApplicationHelper

  def create
    auth = request.env["omniauth.auth"]
    provider = set_provider(auth)
    pseudonym = @domain_root_account.pseudonyms.active.custom_find_by_unique_id(auth[:info][:email])
    unless pseudonym.nil?
    @user = pseudonym.user
    @authentication = OmniauthAuthentication.find_by_user_id(@user.id)
    end
    # Try to find authentication first
      if !!@authentication
        if @authentication.provider == provider
          if @authentication.user.workflow_state != "inactive"
            update_user_info(@authentication,auth)
            reset_session_for_login
            @pseudonym_session = @domain_root_account.pseudonym_sessions.new(@authentication.user)
            @pseudonym = @domain_root_account.pseudonyms.active.custom_find_by_unique_id(@authentication.user.email)
            @pseudonym_session = @domain_root_account.pseudonym_sessions.create!(@pseudonym, false)
            successful_login(@pseudonym_session)
          else
            activation_pending
          end
        else
          flash[:error] = " Sorry,You have already registred with #{@authentication.provider} account."
          redirect_to root_url
        end
      elsif pseudonym.present? and @authentication.nil?
        flash[:error] = " Sorry,You are not registered with social login."
        redirect_to root_url
      else
      password = (0...10).map{ ('a'..'z').to_a[rand(26)] }.join
      @user = User.create!(:name => auth[:info][:name],
                           :sortable_name => auth[:info][:name],
                           :avatar_image_url=>auth[:info][:image],
                           :avatar_image_source=>auth['provider'],
                           :avatar_image_updated_at => Time.now,
                           :phone => auth[:info][:phone])
      @user.workflow_state = 'inactive'
      @pseudonym = @user.pseudonyms.create!(:unique_id => auth[:info][:email],
                                            :account => @domain_root_account)
      @user.communication_channels.create!(:path => auth[:info][:email]) { |cc| cc.workflow_state = 'active' }
      @user.save!
      @pseudonym.save!
      provider = set_provider(auth)
      @omniauth_authentication= OmniauthAuthentication.create!(:provider => provider,
                                                              :token => auth[:credentials][:token],
                                                              :uid => auth['uid'], :user_id=>@user.id)
      un_successful_login
    end
 end

  def successful_login(pseudonym)
    @current_pseudonym = pseudonym
    flash[:notice] = "You are now logged in"
    favourites
  end

  def un_successful_login
    reset_session_for_login
    @current_pseudonym=nil
    flash[:error] = "Account is queued for verification,Once it is completed the admin will contact you ."
    redirect_to root_url
  end

  def activation_pending
    flash[:error] = "Your account is not yet processed,Once it is completed you will get a activation mail ."
    redirect_to root_url
  end

  def auth_failure
    flash[:error] = params[:message]
    redirect_to root_url
  end

 def set_provider(auth)
   if auth['provider'] == "google_oauth2"
     provider = "google"
   else
     provider = auth['provider']
   end
 end

 def update_user_info(authentication,auth)
   authentication.user.avatar_image_url ||= auth[:info][:image]
   authentication.user.phone ||= auth[:info][:phone]
   authentication.user.name ||= auth[:info][:name]
   authentication.user.save!
 end

end