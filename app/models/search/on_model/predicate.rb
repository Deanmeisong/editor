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
class Search::OnModel::Predicate
  attr_reader :canon_field,
              :canon_value,
              :trailing_wildcard,
              :leading_wildcard,
              :multiple_values,
              :predicate,
              :value_frequency,
              :processed_value,
              :tokenize,
              :field,
              :value,
              :has_scope,
              :scope_,
              :order

  def initialize(parsed_request, field, value)
    @parsed_request = parsed_request
    @field = field
    @value = value
    Rails.logger.debug("rules class string: Search::#{@parsed_request.target_model}::FieldRule::RULES")
    @rules_class = "Search::#{@parsed_request.target_model}::FieldRule::RULES".constantize
    @abbrevs_class = "Search::#{@parsed_request.target_model}::FieldAbbrev::ABBREVS".constantize
    @canon_field = build_canon_field(field)
    rule = @rules_class[@canon_field] || EMPTY_RULE
    @is_null = value.blank?
    apply_rule(rule)
    @canon_value = build_canon_value(value)
    apply_scope
    @order = rule[:order] || @parsed_request.default_order_column
    process_value
  end

  def debug(s)
    Rails.logger.debug("Search::OnModel::Predicate - #{s}")
  end

  def inspect
    "Search::OnModel::Predicate: canon_field: #{@canon_field}"
  end

  def apply_rule(rule)
    @scope_ = rule[:scope_] || ""
    @trailing_wildcard = rule[:trailing_wildcard] || false
    @leading_wildcard = rule[:leading_wildcard] || false
    apply_rule_overflow(rule)
  end

  def apply_rule_overflow(rule)
    @multiple_values = rule[:multiple_values] || false
    @predicate = build_predicate(rule)
    @tokenize = rule[:tokenize] && !@is_null || false
  end

  def apply_scope
    @has_scope = @scope_.present?
    @value_frequency = if @has_scope
                         1
                       else
                         @predicate.count("?")
                       end
  end

  def process_value
    @processed_value = @canon_value
    @processed_value = "%#{@processed_value}" if @leading_wildcard
    @processed_value = "#{@processed_value}%" if @trailing_wildcard
  end

  def build_predicate(rule)
    if @multiple_values && @value.split(/,/).size > 1
      rule[:multiple_values_where_clause]
    else
      build_scalar_predicate(rule)
    end
  end

  def build_scalar_predicate(rule)
    if @is_null
      build_is_null_predicate(rule)
    else
      rule[:where_clause]
    end
  end

  def build_is_null_predicate(rule)
    if rule[:not_exists_clause].present?
      rule[:not_exists_clause]
    else
      rule[:where_clause].gsub(/= \?/, "is null")
                         .gsub(/like lower\(\?\)/, "is null")
                         .gsub(/like lower\(f_unaccent\(\?\)\)/, "is null")
    end
  end

  def build_canon_value(val)
    if @multiple_values && @value.split(/,/).size > 1
      val.split(",").collect(&:strip)
    else
      val.tr("*", "%")
    end
  end

  def build_canon_field(field)
    debug("build_canon_field(field) for field: #{field}")
    if @rules_class.key?(field)
      field
    elsif @rules_class.key?(@abbrevs_class[field])
      @abbrevs_class[field]
    else
      raise "Cannot search model for: #{field}. You may need to try another
      search term or target."
    end
  end
end
