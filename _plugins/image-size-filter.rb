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
    puts "fetching size of (#{source})"
    size = FastImage.size(sanitize(source), options)
    puts "  found size: #{size}"
    size
  end

  module ImageSizeFilter
    def fast_image_size_attributes(source)
      begin
        width, height = ::ImageSizeFilterPlugin.safe_size(source, raise_on_failure: true)
        " width=\"#{width}\" height=\"#{height}\" "
      rescue FastImage::UnknownImageType => e
        puts "  unknown image type: #{e}"
        ""
      end
    end

    def fast_image_size(source)
      ::ImageSizeFilterPlugin.safe_size(source, raise_on_failure: true)
    end

    def fast_image_width(source)
      size = ::ImageSizeFilterPlugin.safe_size(source, raise_on_failure: true)
      size[0]
    end

    def fast_image_height(source)
      size = ::ImageSizeFilterPlugin.safe_size(source, raise_on_failure: true)
      size[1]
    end
  end
end

Liquid::Template.register_filter(ImageSizeFilterPlugin::ImageSizeFilter)
