require "digest/md5"

module Jekyll
  module CacheBusterFilter

    module Digester
      def self.get_md5_version(content_path)
        unless File.directory?(content_path)
          puts "[CacheBuster::Digester] reading file #{content_path}"
          contents = File.read(content_path)
          digested = Digest::MD5.hexdigest(contents)
          puts "  #{digested}"
          digested
        else
          puts "[CacheBuster::Digester] reading dir #{content_path}"
          glob = File.join(content_path, "**", "*")
          directory_files_content = Dir[glob].map{|f| File.read(f) unless File.directory?(f) }.join
          digested = Digest::MD5.hexdigest(directory_files_content)
          puts "  #{digested}"
          digested
        end
      end
    end

    def bust_time(source)
      "#{source}?v=#{Time.now.strftime}"
    end

    def bust_asset(source, content_path = nil)
      content_path = source if content_path.nil?
      content_path = RelativeFilePath::url_to_rel_path(content_path)
      "#{source}?v=#{Digester.get_md5_version(content_path)}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::CacheBusterFilter)
