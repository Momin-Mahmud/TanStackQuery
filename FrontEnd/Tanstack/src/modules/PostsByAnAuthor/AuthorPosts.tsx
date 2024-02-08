import { useLocation } from "react-router-dom"
import { getAuthorPosts } from "../../api/author.api"
import { useEffect, useState } from "react"

const AuthorPosts = () => {
    const [posts, setPosts] = useState([])
    const state = useLocation().state
    const getPostsforAuthor = async () => {

        try {
            let { status, data } = await getAuthorPosts(state)
            if (status === 200) {
                setPosts(data)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPostsforAuthor()
    },[])

    return (
        <div>
            <h1>Posts</h1>
            <p>
                {posts.map((post: any) => (
                    <div>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <hr/>
                    </div>
                ))}
            </p>
        </div>

    )
}

export default AuthorPosts