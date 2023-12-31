const API_URL = process.env.WORDPRESS_GRAPHQL_API_URL

async function fetchAPI(query, { variables } = {}) {
   // console.log("fetchAPI");
	const headers = { 'Content-Type': 'application/json' }

    const res = await fetch(API_URL, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			query,
			variables,
		}),
	})
	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		throw new Error('Failed to fetch API')
	}
	return json.data
}



export async function getAllVehicles() {
    const data = await fetchAPI(`
    query MyQuery{
      vehicles{
        edges{
          node{
            title
            slug
            vehicleTypes{
              edges{
                node{
                  name 
                  slug
                }
              }
            }
            vehicleInformation{
              trimLevels{
                name
                msrp
                images{
                  thumbnail{
                    node{
                      sourceUrl
                      altText
                      mediaDetails{
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`)
    return data?.vehicles.edges
}

export async function getAllVehicleTypes() {
  const data = await fetchAPI(`
  query MyQuery{
    vehicleTypes{
      edges{
        node{
          name
          slug
        }
      }
      }
  }`)
  return data?.vehicleTypes.edges
}

// keep adding more functions below.  e.g. getAllVehicleSlugs, getVehicleBySlug




    export async function getAllVehicleSlugs() {
      const data = await fetchAPI(` 
      query NewQuery {
        vehicles {
          edges {
            node {
              title
              slug
            }
          }
        }
      } `)
      return data?.vehicles.edges
  }
  

  export async function getVehicleBySlug(slug) {
    const data = await fetchAPI(`
    query MyQuery($id: ID!) {
      vehicle(idType: URI, id: $id) {
        title
        slug
        featuredImage {
          node {
            altText
            sourceUrl
            mediaDetails {
              width
              height
            }
          }
        }
        vehicleInformation {
          showcase {
            headline
          }
          trimLevels {
            name 
            msrp
            images {
              large {
                node {
                  altText
                  sourceUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
          vehicleColors {
            image {
              node {
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
            swatch {
              edges {
                node {
                  ... on Swatch {
                    name
                    swatchInformation {
                      hexValue
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `, {
		variables: {
			"id": slug
		}
	})
	return data?.vehicle
}

    //export function getAllVehicles() {
     //   return vehicles;
   // }