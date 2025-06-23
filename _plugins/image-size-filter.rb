require 'fastimage'

module ImageSizeFilterPlugin
  def self.sanitize(url)
    return nil unless url.is_a?(String)
    return nil unless url.match?(/\Ahttps:\/\//)

    begin
      uri = URI.parse(url)
      return nil if uri.host.nil?
      url
    rescue URI::InvalidURIError
      nil
    end
  end

  def self.safe_size(source, options={ timeout: 10 })
    return nil if ENV['JEKYLL_ENV'] != 'production'

    puts "fetching size of (#{source})"
    size = FastImage.size(sanitize(source), options)
    puts "  found size: #{size}"
    size
  end

  module ImageSizeFilter
    def fast_image_size_attributes(source)
      begin
        size = ::ImageSizeFilterPlugin.safe_size(source, raise_on_failure: true)
        return size if size.nil?

        " width=\"#{size[0]}\" height=\"#{size[1]}\" "
      rescue FastImage::UnknownImageType => e
        puts "  unknown image type: #{e}"
        ""
      rescue => e
        puts "  unknown error: #{e}"
        ""
      end
    end

    def fast_image_size(source)
      ::ImageSizeFilterPlugin.safe_size(source, raise_on_failure: true)
    end

    def fast_image_width(source)
      size = ::ImageSizeFilterPlugin.safe_size(source, raise_on_failure: true)
      size ? size[0] : nil
    end

    def fast_image_height(source)
      size = ::ImageSizeFilterPlugin.safe_size(source, raise_on_failure: true)
      size ? size[1] : nil
    end
  end
end

Liquid::Template.register_filter(ImageSizeFilterPlugin::ImageSizeFilter)
if ENV['JEKYLL_ENV'] != 'production'
  puts "ImageSizeFilter running in development, all fetches will return nil"
end
