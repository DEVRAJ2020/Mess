
import firestore, { firebase } from '@react-native-firebase/firestore';

//  ADD TO ALLPAYMENTS   //
export const AddToAllpayments=async(props)=>{
    console.log("ALLPAYMENTS PROPS",props);
    const  res= await firestore().collection('Users').doc('RootData').update(
        {
        AllPayments: firebase .firestore.FieldValue.arrayUnion(props)  // INSERT PAYMENTS IN ALLPAYMENTS 
        
  })

   }



   // DELETE FROM  ALL PAYMENTS //

   
  export const DeleteFromAllpayments=async(obj)=>{
    console.log("deletepayment called with element",obj);
    const  res2= await firestore().collection('Users').doc('RootData').update(
        {
        AllPayments: firebase .firestore.FieldValue.arrayRemove(obj) 
  
  })

   }


   export const DeleteUserElements=async(ele)=>{
    console.log("deletepayment USERELEMENT with element",ele);
    const  res2= await firestore().collection('Users').doc('RootData').update(
        {
        ChartData: firebase .firestore.FieldValue.arrayRemove(ele) 
  
  })

   }
   
   export const AddExpenseonCloud=async(props)=>{
    console.log("expense on cloud called with props is  ",props);

    const  res= await firestore().collection('Users').doc('RootData').update(
        {
            Expenses: firebase .firestore.FieldValue.arrayUnion(props)  // INSERT NEW EXPENSE IN EXPENSES ARRAY 
        
  })
  console.log("expense on cloud is res ",res);

   }


   export const AddNewUserElement=async(props)=>{
    const  res= await firestore().collection('Users').doc('RootData').update(
        {
        ChartData: firebase .firestore.FieldValue.arrayUnion(props)  // INSERT NEW USER ELEMENT IN CHARTDATA 
        
  })

   }


   export const UpdateProfileData=async(state,action)=>{
    let name=action.payload.PaidBy;
            let Obj=state.data.ChartData
            let Allpaid=state.data.AllPayments
            let NewUserelement={};
            let Total=0;
            
                Obj.map((ele)=>{
                ele.label==name ?(
                DeleteUserElements(ele),    
                ele?.payments.push(action.payload), ele?.value,  // ADDING TO USER'S PAYMENTS ARRAY  / PROFILE CONTRIBUTION //
                ele?.payments.map((e)=>{
                    Total=Total+e?.amt
                 ele.value=Total;     // ADDING TO  PROFILE CONTRIBUTION //
                 NewUserelement=ele;
                 })
                
                )
                 
                 : console.log("not ",ele.label);
                 
            })
            AddNewUserElement(NewUserelement) // 
            console.log("userelement is ",OldUserElement,NewUserelement)

   }