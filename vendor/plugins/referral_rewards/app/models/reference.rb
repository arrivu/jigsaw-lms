class Reference < ActiveRecord::Base

  belongs_to :referral
  has_many :referrees
  has_many :referrer_coupons

  attr_accessible  :short_url_code, :provider, :status, :visit_count,:referral_id

  FACEBOOK ='facebook'
  GOOGLE ='google'
  TWITTER ='twitter'
  LINKEDIN ='linkedin'
  GLOBAL  = 'global'
  ACCOUNT = 'account'
  SELF = 'self'

  STATUS_CREATE = 'Created'
  STATUS_VISIT = 'Visited'
  STATUS_REGISTER = 'Registered'
  STATUS_ENROLL = 'Enrolled'

  CHARSETS = {
      :alphanum => ('a'..'z').to_a + (0..9).to_a,
      :alphanumcase => ('a'..'z').to_a + ('A'..'Z').to_a + (0..9).to_a }

  providers = [FACEBOOK,GOOGLE,TWITTER,LINKEDIN,GLOBAL,ACCOUNT,SELF]

  scope :not_in_social, where('provider not in (?)',providers)

  # default key length: 5 characters
  mattr_accessor :unique_key_length
  self.unique_key_length = 5

  # character set to chose from:
  #  :alphanum     - a-z0-9     -  has about 60 million possible combos
  #  :alphanumcase - a-zA-Z0-9  -  has about 900 million possible combos
  mattr_accessor :charset

  self.charset = :alphanum

  def key_chars
    CHARSETS[charset]
  end


  # we'll rely on the DB to make sure the unique key is really unique.
  # if it isn't unique, the unique index will catch this and raise an error
  def create
    count = 0
    begin
      self.short_url_code = generate_unique_key
      super
      #ActiveRecord::RecordNotUnique
    rescue ActiveRecord::ActiveRecordError, ActiveRecord::StatementInvalid => err
      if (count +=1) < 5
        logger.info("retrying with different unique key")
        retry
      else
        logger.info("too many retries to get an unique code for the Reference, giving up")
        raise
      end
    end
  end

  # generate a random string
  # future mod to allow specifying a more expansive charst, like utf-8 chinese
  def generate_unique_key
    # not doing uppercase as url is case insensitive
    charset = key_chars
    (0...unique_key_length).map{ charset[rand(charset.size)] }.join
  end



end
