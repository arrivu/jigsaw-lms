module ReferralsHelper
   def list_rewards(account=nil,for_report=nil,condition=nil)
     @domain_root_account ||=  account
     @referral_rewards = []

       @rewards = @domain_root_account.rewards
       @rewards.each do |reward|
         @referrals = reward.referrals
         @referrals.each do |referral|
           @references = referral.references
           @references.each do |reference|
             @referrees = reference.referrees.find(:all,:conditions => condition)
             #@referrees = Referree.find(:all,:conditions => condition)
             @referrees.each do |referree|
               @referral_reward = {type: Reward::REFEREE ,name: referree.name,email: referree.email,
                                   provider: referree.referral_email,context_type: reward.metadata_type,
                                   context_id: reward.metadata,reward_name: reward.name,
                                   reward_description: reward.description,expiry_date: referree.expiry_date,
                                   coupon_code: referree.coupon_code,status: referree.status}
               @referral_rewards << (@referral_reward)
             end
             @referrer_coupons =  reference.referrer_coupons.find(:all,:conditions => condition)
             #@referrer_coupons =  ReferrerCoupon.find(:all,:conditions => condition)
             @referrer_coupons.each do |referrer_coupon|
               @referral_reward = {type: Reward::REFERER ,name: referral.pseudonym.user.name,
                                   email: referral.pseudonym.unique_id,provider: reference.provider,
                                   context_type: reward.metadata_type,context_id: reward.metadata,reward_name: reward.name,
                                   reward_description: reward.description,expiry_date: referrer_coupon.expiry_date,
                                   coupon_code: referrer_coupon.coupon_code,status: referrer_coupon.status}
               @referral_rewards << (@referral_reward)
             end
           end
         end
       end

      unless for_report
     #js_env(REFERRAL_REWARDS: @referral_rewards.to_json)

     respond_to do |format|


       format.json { render :json => @referral_rewards }


     end
      end
   end


end
