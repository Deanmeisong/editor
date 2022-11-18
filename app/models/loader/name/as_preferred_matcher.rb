# frozen_string_literal: true

#   Copyright 2015 Australian National Botanic Gardens
#
#   This file is part of the NSL Editor.
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

#   Create a preferred match for a loader_name record
class Loader::Name::AsPreferredMatcher
  def initialize(loader_name, authorising_user, job_number)
    debug("initialize Loader::Name::AsPreferredMatcher; job: #{job_number}")
    debug("loader_name: #{loader_name}; authorising_user: #{authorising_user}")
    @loader_name = loader_name
    @authorising_user = authorising_user
    @job_number = job_number
  end

  def create
    result = @loader_name.create_preferred_match(@authorising_user)
    created = result[0]
    declined = result[1]
    errors = result[2]
    return [created, declined, errors]
  end

  def no_further_processing
    log_to_table("Declined - no further processing")
    [0,1,0]
  end
    
  def created
    @created
  end

  def errors
    @errors
  end

  def log_create_action(count)
    entry = "Create preferred match counted #{count} #{'record'.pluralize(count)}"
    log_to_table(entry)
  end

  def log_to_table(entry)
    BulkProcessingLog.log("Job ##{@job_number}: #{entry}", "Bulk job for #{@authorising_user}")
  rescue => e
    Rails.logger.error("Couldn't log to table: #{e.to_s}")
  end

  def scientific_name
    @loader_name.scientific_name
  end

  def record_failure(msg)
    msg.sub!(/uncaught throw /,'')
    msg.gsub!(/"/,'')
    msg.sub!(/^Failing/,'')
    Rails.logger.error("Loader::Name::AsPreferredMatcher failure: #{msg}")
    log_to_table("Loader::Name::AsPreferredMatcher failure: #{msg}")
  end

  def debug(msg)
    Rails.logger.debug("Loader::Name::AsPreferredMatcher #{msg} #{@tag}")
  end
end
