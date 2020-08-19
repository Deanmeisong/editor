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

#   Taxonomy reviews are reviews of tree (taxonomy) versions
class TaxonomyReviewsController < ApplicationController
  before_action :find_taxonomy_review, only: [:show, :tab, :update, :destroy]

  def index
  end

  def show
    set_tab
    set_tab_index
    if params[:tab] =~ /\Atab_periods_of_review\z/
      @taxonomy_review_period = TaxonomyReviewPeriod.new
      @taxonomy_review_period.taxonomy_review = @taxonomy_review
    end

    @take_focus = params[:take_focus] == 'true'
    render "show", layout: false
  end

  alias tab show

  # POST /taxonomy_reviews
  def create
    @taxonomy_review = TaxonomyReview.create(taxonomy_review_params,
                                               current_user.username)
    render "create.js"
  rescue => e
    logger.error("Controller:TaxonomyReview:create:rescuing exception #{e}")
    @error = e.to_s
    render "create_error.js", status: :unprocessable_entity
  end

  def update
    @message = @taxonomy_review.update_if_changed(taxonomy_review_params,
                                                  current_user.username)
    render "update.js"
  #rescue => e
    #logger.error("TaxonomyReview#update rescuing #{e}")
    #@message = e.to_s
    #render "update_error.js", status: :unprocessable_entity
  end

  # DELETE 
  def destroy
    username = current_user.username
    if @taxonomy_review.update_attribute(:updated_by, username) && @taxonomy_review.destroy
      render
    else
      render js: "alert('Could not delete that record.');"
    end
  end


  private

  def find_taxonomy_review
    @taxonomy_review = TaxonomyReview.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    flash[:alert] = "We could not find the record."
    redirect_to taxonomy_review_path
  end

  def taxonomy_review_params
    params.require(:taxonomy_review).permit(:name, :tree_version_id)
  end

  def set_tab
    @tab = if params[:tab].present? && params[:tab] != "undefined"
             params[:tab]
           else
             "tab_details"
           end
  end

  def set_tab_index
    @tab_index = (params[:tabIndex] || "1").to_i
  end
end
