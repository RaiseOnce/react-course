import React, { useState } from 'react'
import './styles/App.css'
import PostList from './components/PostList'

import PostForm from './components/PostForm'
import MyInput from './components/UI/input/MyInput'
import MySelect from './components/UI/select/MySelect'
import MyModal from './components/UI/modal/MyModal'
import MyButton from './components/UI/button/MyButton'
import { usePosts } from './hooks/usePosts'

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'LJavaScript', body: 'ADescription' },
    { id: 2, title: 'GJavaScript 2', body: 'Fescription 2' },
    { id: 3, title: 'AJavaScript 3', body: 'DDescription 3' },
  ])

  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter((item) => item.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(!modal)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <MyInput
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        placeholder="Поиск..."
      />
      <MySelect
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue="Сортировка"
        options={[
          { value: 'title', name: 'По названию' },
          { value: 'body', name: 'По описанию' },
        ]}
      />

      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Посты про JS"
      />
    </div>
  )
}

export default App
