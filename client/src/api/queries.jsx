import {gql} from '@apollo/client'

/**
 * Query to fetch a single movie's details
 */
export const GET_MOVIE_QUERY = gql`
    query GetMovie($id: ID!){
        getMovie(id: $id){
            id
            title
            posterURL
            reviews{
                text
            }
        }
    }
    
`;

export const GET_ALL_MOVIE_IDS_QUERY = gql`
        query GetAllMovieIds{
            getAllMovieIds
        }
`;