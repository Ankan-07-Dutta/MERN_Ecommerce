import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


//Fetch all products
export const fetchAdminProducts = createAsyncThunk('admin/fetchAdminProducts', async(_,{rejectWithValue})=> {
    try {
       const {data} = await axios.get('/api/v1/admin/products');
       return data;
        
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error While Fetching the products");

    }
})

//Create products
export const createProduct = createAsyncThunk('admin/createProduct', async(productData,{rejectWithValue})=> {
    try {
        const config = {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
       const {data} = await axios.post('/api/v1/admin/product/create', productData,config);
       return data;
        
    } catch (error) {
        return rejectWithValue(error.response?.data || "Product Creation Failed");

    }
})


//Update products
export const updateProduct = createAsyncThunk('admin/updateProduct', async({id,formData},{rejectWithValue})=> {
    try {
        const config = {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
       const {data} = await axios.put(`/api/v1/admin/product/${id}`, formData,config);
       return data;
        
    } catch (error) {
        return rejectWithValue(error.response?.data || "Product Update Failed");

    }
})


//Delete products
export const deleteProduct = createAsyncThunk('admin/deleteProduct', async(productId,{rejectWithValue})=> {
    try {
       const {data} = await axios.delete(`/api/v1/admin/product/${productId}`);
       return {productId};
        
    } catch (error) {
        return rejectWithValue(error.response?.data || "Product Deletion Failed");

    }
})



//Fetch all users
export const fetchUsers = createAsyncThunk('admin/fetchUsers', async(_,{rejectWithValue})=> {
    try {
       const {data} = await axios.get('/api/v1/admin/users');
       return data;
        
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch users");

    }
})

//Get single user
export const getSingleUser = createAsyncThunk('admin/getSingleUser', async(id,{rejectWithValue})=> {
    try {
       const {data} = await axios.get(`/api/v1/admin/user/${id}`);
       return data;
        
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch user");

    }
})

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        products:[],
        success:false,
        loading:false,
        error:null,
        product:{},
        deleting : {},
        users:[],
        user:{}
    },
    reducers:{
        removeErrors:(state)=> {
            state.error = null
        },
        removeSuccess: (state)=> {
            state.success = false;
        }
    },
    extraReducers:(builder)=>{
        
        //Fetch Product cases
        builder
        .addCase(fetchAdminProducts.pending, (state)=>{
            state.loading= true
            state.error = null
        })
        .addCase(fetchAdminProducts.fulfilled, (state, action)=>{
            state.loading= false;
            state.products = action.payload.products
        })
        .addCase(fetchAdminProducts.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload?.message || 'Error While Fetching the products';
        })


        // Create product cases
        builder
        .addCase(createProduct.pending, (state)=>{
            state.loading= true
            state.error = null
        })
        .addCase(createProduct.fulfilled, (state, action)=>{
            state.loading= false;
            state.success = action.payload.success;
            state.products.push(action.payload.product);
            console.log(state.products);
            
        })
        .addCase(createProduct.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload?.message || 'Product Creation Failed';
        })
        

        // Update Product Cases
        builder
        .addCase(updateProduct.pending, (state)=>{
            state.loading= true
            state.error = null
        })
        .addCase(updateProduct.fulfilled, (state, action)=>{
            state.loading= false;
            state.success = action.payload.success;
            state.product = action.payload.product;
            
        })
        .addCase(updateProduct.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload?.message || 'Product Update Failed';
        })

        // Update Product Cases
        builder
        .addCase(deleteProduct.pending, (state, action)=>{
            const productId = action.meta.arg;
            state.deleting[productId] = true;
        })
        .addCase(deleteProduct.fulfilled, (state, action)=>{
            const productId =action.payload.productId ;
            state.deleting[productId] = false;
            state.products = state.products.filter(product => product._id !== productId );
            
        })
        .addCase(deleteProduct.rejected, (state,action)=>{
            const productId = action.meta.arg;
            state.deleting[productId] = false;
            state.error = action.payload?.message || 'Product Deletion Failed';
        })


        // Fetch All Users Cases
        builder
        .addCase(fetchUsers.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action)=>{
            state.loading= false;
            state.users = action.payload.users;
        })
        .addCase(fetchUsers.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload?.message || "Failed to fetch users";
        })


        // Fetch All Users Cases
        builder
        .addCase(getSingleUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getSingleUser.fulfilled, (state, action)=>{
            state.loading= false;
            state.user = action.payload.user;
        })
        .addCase(getSingleUser.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload?.message || "Failed to fetch user";
        })
    }
})

export const { removeErrors, removeSuccess}= adminSlice.actions
export default adminSlice.reducer