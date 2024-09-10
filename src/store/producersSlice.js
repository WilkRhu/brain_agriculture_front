import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Ação para buscar produtores
export const fetchProducers = createAsyncThunk('producers/fetchProducers', async () => {
  const response = await axios.get('http://localhost:3001/farmers')
  return response.data
})

// Ação para deletar um produtor
export const deleteProducer = createAsyncThunk('producers/deleteProducer', async (id) => {
  await axios.delete(`http://localhost:3001/farmers/${id}`)
  return id
})

const producersSlice = createSlice({
  name: 'producers',
  initialState: {
    producers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducers.fulfilled, (state, action) => {
        state.loading = false
        state.producers = action.payload
      })
      .addCase(fetchProducers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteProducer.fulfilled, (state, action) => {
        state.producers = state.producers.filter((producer) => producer.id !== action.payload)
      })
  },
})

export default producersSlice.reducer
