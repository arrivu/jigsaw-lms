Course.class_eval do
  has_many :offers

  def has_offer?
    offers.present?
  end

end
