Account.class_eval do
  has_many :rewards

  def has_reward?
    rewards.present?
  end

end
