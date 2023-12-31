import React, { useMemo, useState } from 'react'
import './styles/App.css'
import PostList from './components/PostList'

import PostForm from './components/PostForm'
import PostFilter from './components/PostFilter'

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'LJavaScript', body: 'ADescription' },
    { id: 2, title: 'GJavaScript 2', body: 'Fescription 2' },
    { id: 3, title: 'AJavaScript 3', body: 'DDescription 3' },
  ])

  const [filter, setFilter] = useState({ sort: '', query: '' })

  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      )
    }
    return posts
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query)
    )
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter((item) => item.id !== post.id))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />

      <hr style={{ margin: '15px 0' }} />

      <PostFilter filter={filter} setFilter={setFilter} />

      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Посты про JS"
      />
    </div>
  )
}

export default App
