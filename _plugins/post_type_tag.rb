# Frontmatter defaults do not auto append for tags like categories do

Jekyll::Hooks.register :site, :post_read do |site|
  site.collections['posts'].docs.each do |doc|
  post_type = doc.data['post_type']
  if post_type
    tags = []
    tags << doc.data['tags']
    tags << ["#{post_type} post"]
    tags.flatten!
    tags.compact!

    # puts doc.path
    # puts tags.join(',')
    doc.data['tags'] = tags
  end
  end
end
