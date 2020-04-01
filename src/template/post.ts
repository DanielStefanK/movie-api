
function createPostTemplate(
  text: string, 
  no: string, 
  title: string, 
  year: string, 
  genre: string, 
  directors: string,
  amazonlink: string,
  trailer: string,
  poster: string
): string {
  const allTitle = new RegExp(title,"g")

  const linkedTitle = `<a href="${amazonlink}"><em>${title}</em></a>`

  const linkedTexted = text.replace(allTitle, linkedTitle)

  return `
  &nbsp;
  <h2>${no}. ${title} (${year})</h2>
  <a href="${amazonlink}" target="_blank" rel="noopener noreferrer"><img class=" wp-image-3874 alignleft" src="${poster}" alt="${title}" width="120" height="179" /></a>${linkedTexted}
  <h5>${genre} | Director: ${directors}</h5>
  [embed]${trailer}[/embed]
  <h6>Buy <em>${title}</em> on Amazon: <a href="${amazonlink}" rel="noopener noreferrer">${amazonlink}</a></h6>
  `
}

export default createPostTemplate