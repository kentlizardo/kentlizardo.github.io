
require 'pathname'

module RelativeFilePath
  def self.ensure_leading_slash(input)
    return input if input.nil? || input.empty? || input.start_with?("/")
    "/#{input}"
  end

  def self.url_to_rel_path(url, from = "/")
    raise "url cannot be null" if url.nil?
    url = ensure_leading_slash(url)
    Pathname(url).relative_path_from(from).to_s
  end
end

module Jekyll
  module RelativeFilePathFilter
    def real_relative_url(url)
      return if url.nil?
      url = ensure_leading_slash(url)
      page_url = @context.registers[:page]["url"]
      page_dir = Pathname(page_url).parent
      target = page_url.end_with?("/") ? Pathname(page_url) : page_dir
      RelativeFilePath::url_to_rel_path(url, target)
    end
  end
end

Liquid::Template.register_filter(Jekyll::RelativeFilePathFilter)
