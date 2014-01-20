Pseudonym.class_eval do
  has_many :rewards
  has_many :referral

  def has_reward?
    rewards.present?
  end

  def has_referral?
    referrals.present?
  end

end
