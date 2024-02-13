import {generatePath} from 'react-router'

export const indexPattern = '/'
export const getIndexRoute = () => {
  console.log('test')
  return generatePath(indexPattern)
}
