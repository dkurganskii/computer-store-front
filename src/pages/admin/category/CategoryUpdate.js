import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategory, updateCategory } from '../../../functions/category'
import CategoryForm from '../../../components/forms/CategoryForm'


const CategoryUpdate = ({ history, match }) => {
    const { user } = useSelector(state => ({ ...state }))
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        loadCategory()
        // eslint-disable-next-line
    }, [])

    const loadCategory = () =>
        getCategory(match.params.slug).then(c => setName(c.data.name))

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name.trim().length < 2 || name.trim().length > 32){
            alert('Category name must be from 2 to 32 characters long')
        }else{
            updateCategory(match.params.slug, { name }, user.token)
                .then(res => {
                    setLoading(false)
                    setName('')
                    toast.success(`"${res.data.name}" is updated`)
                    history.push('/admin/category')
    
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                    if (err.response.status === 400) {
                        toast.success(err.response.data)
                    }
                })
        }  
    }
    return (
        <div className='container-fluid pt-3'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav />
                </div>
                <div className='col-md-8'>
                    {loading ? <h4 className='text-danger'>Loadig...</h4> : <h4>Update Category</h4>}
                    <br/>
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

                </div>
            </div>
        </div>
    )
}

export default CategoryUpdate;