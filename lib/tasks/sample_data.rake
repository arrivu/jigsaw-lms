
namespace :db  do
  desc "Generate sample discussion topics"
  task :populate => :load_environment do
    100.times do |n|
      title = "example-#{n+1}title"
      message = "This is a #{n+1} message"
      DiscussionTopic.create!(title: title,
                   message: message,
                   context_type: "Course",
                   context_id: 3)
  end
 end
end # Namespace: db


