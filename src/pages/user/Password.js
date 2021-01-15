import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'


const Password = () => {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password.trim().length<6){
            alert('Password must contain atleast 6 characters')
        }else{
            e.preventDefault()
            setLoading(true)
            await auth.currentUser.updatePassword(password)
                .then(() => {
                    setLoading(false)
                    setPassword('')
                    toast.success('Password Updated')
                })
                .catch(err => {
                    setLoading(false)
                    toast.error(err.message)
                })
        }  
    }

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <input autoFocus type='password' onChange={e => setPassword(e.target.value)}
                    className='form-control mt-5' placeholder='Enter new password' disabled={loading} value={password} />
                <button className='text-center btn btn-primary btn-raised mt-4' disabled={loading}>Submit</button>
            </div>
        </form>
    )

    return (
        <div className='container-fluid pt-3'>
            <div className='row'>
                <div className='col-md-2'>
                    <UserNav />
                </div>
                <div className='col-md-8 pt-2'> {loading ? (<h4 className='text-danger'>Loading...</h4>) : (<h4>Password Update</h4>)}

                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    )
}
export default Password;