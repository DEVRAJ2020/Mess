import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firestore, { firebase } from '@react-native-firebase/firestore';
import { AddExpenseonCloud, AddNewUserElement, AddToAllpayments, AddtoAllpayments, DeleteFromAllpayments, DeleteUserElements, UpdateProfileData } from "../../Components/AddtoAllpayments";




export const FetchData = createAsyncThunk("FetchData", async () => {
    console.log("Fetchdata caled");
    const Response = await firestore().collection('Users').doc('RootData').get();
    console.log("fetched data is ",Response._data);   
    return Response._data;
})


  


// const UpdateData=async(Props)=>{
//     // console.log("update data res is jjj",Props);
//     const Response2 = await firestore().collection('Users').doc('RootData').update({'TRIAL.vALUE':"yes01"});
      
// }
let OldUserElement=null;


const UserSlice = createSlice({
    name: "Users",
    initialState:{
        data:null
    },
    reducers: {
         payingtoMess(state, action) {  //PAYING TO MESS //
            state.data.AllPayments.push({Date:action.payload.Date, PaidBy:action.payload.PaidBy,amt:Number(action.payload.amt),Remarks:action.payload.Remarks,DeviceId:action.payload?.DeviceId}) // ADDING TO TOTAL FUNDS in LOCAL STORAGE (allpayments)
                       AddToAllpayments({Date:action.payload.Date, PaidBy:action.payload.PaidBy,amt:Number(action.payload.amt),Remarks:action.payload.Remarks,DeviceId:action.payload?.DeviceId}) // UPDATE ON CLOUD WORKING DONE
            let name=action.payload.PaidBy;
            let Obj=state.data.ChartData
            let Allpaid=state.data.AllPayments
            let NewUserelement={};
            let Total=0;
            
                Obj.map((ele)=>{
                ele.label==name ?(
                DeleteUserElements(ele), 
                //console.log("action payload is ",action.payload),   
                ele.payments.push(action.payload), // ADDING TO USER'S PAYMENTS ARRAY  / PROFILE CONTRIBUTION //
                ele.payments.map((e)=>{
                    Total=Total+e.amt
                 ele.value=Total;     // ADDING TO  PROFILE CONTRIBUTION //
                 NewUserelement=ele;
                 })
                
                )
                 
                 : console.log("not ",ele.label);
                 
            })
            AddNewUserElement(NewUserelement) // 
            console.log("userelement is ",OldUserElement,NewUserelement)

           // UpdateUserChartData()

        
          //  console.log(state.data.ChartData[0]);

        },
        marketingfromMessing(state, action) {
            state.data.Expenses.push(action.payload)
            AddExpenseonCloud(action.payload)
            console.log("marketing expenses ",action.payload);

         },
        marketingfromSelf(state, action) {
            state.data.AllPayments.push(action.payload) // ADDING TO ALLPAYMENTS in LOCAL STORAGE (allpayments)
            AddToAllpayments(action.payload) // UPDATE ALLPAYMENTS  ON CLOUD 
            state.data.Expenses.push(action.payload)  // UPDATE EXPENSE ON LOCAL STORAGE 
            AddExpenseonCloud(action.payload)     // UPDATE EXPENSES ON CLOUD
            console.log("MFM CALLED WITH ",state.data.AllPayments);
            UpdateProfileData(state,action)

         }

    },

    extraReducers:(builder)=>{
        builder.addCase(FetchData.fulfilled,(state,action)=>{
           // console.log("state in fulfilled is ",state,action.payload);
           state.data=action.payload
            //state.users=action.payload
        }),
        builder.addCase(FetchData.rejected,(state,action)=>{
            console.log("error in api in thunk",action.error.message);
        })
        builder.addCase(FetchData.pending,(state,action)=>{
            console.log("api state is pending");
        })
    }
})
// console.log("userslice", UserSlice.actions);

export { UserSlice }
export const { payingtoMess,marketingfromMessing,marketingfromSelf } = UserSlice.actions