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
#
class OrchidsBatchController < ApplicationController

  def index
  end

  def progress
    remember_taxon_string
    case params[:submit]
    when 'Create Preferred Matches'
      create_preferred_matches
    when 'Create Draft Instances'
      create_instances_for_preferred_matches
    when 'Add to draft tree'
      add_instances_to_draft_tree
    else 
      show_progress
      render 'progress'
    end
  end

  def remember_taxon_string
    session[:taxon_string] = params[:taxon_string] unless params[:taxon_string].blank?
  end

  def show_progress
    @progress = Orchid::AsProgressReporter.new(params[:taxon_string]).progress_report
  end
  private :show_progress

  def create_preferred_matches
    prefix = the_prefix('create-preferred-matches-')
    attempted, records = Orchid.create_preferred_matches_for_accepted_taxa(params[:taxon_string], @current_user.username)
    @message = "Created #{records} matches out of #{attempted} records matching the string '#{params[:taxon_string]}'"
    render 'create', locals: {message_container_id_prefix: prefix }
  rescue => e
    logger.error("OrchidsBatchController#create_preferred_matches: #{e.to_s}")
    logger.error e.backtrace.join("\n")
    @message = e.to_s.sub(/uncaught throw/,'').gsub(/"/,'')
    render 'error', locals: {message_container_id_prefix: prefix }
  end

  def create_instances_for_preferred_matches
    prefix = the_prefix('create-draft-instances-')
    records = Orchid.create_instance_for_preferred_matches_for(params[:taxon_string], @current_user.username)
    @message = "Created #{records} draft instances for #{params[:taxon_string]}"
    render 'create', locals: {message_container_id_prefix: prefix }
  rescue => e
    logger.error("OrchidsBatchController#create_instances_for_preferred_matches: #{e.to_s}")
    logger.error e.backtrace.join("\n")
    @message = e.to_s.sub(/uncaught throw/,'').gsub(/"/,'')
    render 'error', locals: {message_container_id_prefix: prefix }
  end

  def add_instances_to_draft_tree
    prefix = the_prefix('add-instances-to-tree-')
    logger.debug("#add_instances_to_draft_tree start")
    placed_tally, error_tally, preflight_stop_tally = Orchid.add_to_tree_for(@working_draft, params[:taxon_string], @current_user.username)
    logger.debug("records added to tree: #{placed_tally}")
    message(placed_tally, error_tally, preflight_stop_tally)
    render 'create', locals: {message_container_id_prefix: prefix }
  rescue => e
    logger.error("OrchidsBatchController#add_instances_to_draft_tree: #{e.to_s}")
    logger.error e.backtrace.join("\n")
    @message = e.to_s.sub(/uncaught throw/,'').gsub(/"/,'')
    render 'error', locals: {message_container_id_prefix: prefix }
  end

  def message(placed_tally, error_tally, preflight_stop_tally)
    @message = %Q(Added to tree: #{placed_tally}; )
    @message += %Q(Errors: #{error_tally}; )
    @message += %Q( Stopped pre-flight: #{preflight_stop_tally})
  end

  private

  def orchid_batch_params
    return nil if params[:orchid_batch].blank?
    params.require(:orchid_batch).permit(:taxon_string, :gui_submit_place)
  end

  def debug(msg)
    logger.debug('OrchidsBatchController')
  end

  def the_prefix(str)
    if params[:gui_submit_place].nil?
      str
    else
      "#{params[:gui_submit_place]}-#{str}"
    end
  end
end
