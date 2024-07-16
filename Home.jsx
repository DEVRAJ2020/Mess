import { ActivityIndicator, Dimensions, Image, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View, ImageBackground, TextInput, ScrollView, ToastAndroid, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import { useDispatch, useSelector } from 'react-redux';
import { FetchData, addPayments, marketingfromMessing, marketingfromSelf, payingtoMess } from './src/Store/slices/UserSlices';
import DropDownPicker from 'react-native-dropdown-picker';
import DeviceInfo, { getManufacturer, getUniqueId } from 'react-native-device-info';
import { firebase } from '@react-native-firebase/firestore';



export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
export const Bgcolor = "#7ABA78";

export default function Home() {
  // const { contextData} =useApi();
  useEffect(() => {
  
    DeviceInfo.getDeviceName().then((deviceName) => {
     console.log("device name isssss",deviceName);
     setDeviceId(deviceName)
    });
    console.log("useeffect called ");
    setTimeout(() => {
      setVisible(true)
    }, 1000);


  }, [STATE?.users?.data]);

  const [visivle, setVisible] = useState(false)
   const [paymentData, setPaymentdata] = useState([])
  const [addmodal, setAddModalVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false) // user payment modal
  const [CollectionModal, setCollectionModal] = useState(false)
  const [expenseModal, setExpensemodal] = useState(false)
  const [open, setOpen] = useState(false);
  const [Name, setValue] = useState(null);
  const [selected, setSelected] = useState(0)
  const [amount, setAmount] = useState(null)
  const [imageuri, setSelectedImage] = useState(null)
  const [marketingType, setMarketingType] = useState(null)
  const [Remarks, setRemarks] = useState(null)
  const [DeviceId, setDeviceId] = useState(null)

  const [detailsModal, setdetailsModal] = useState({ state: false, item: {} })
  const [items, setItems] = useState([
    { label: 'Sujit', value: 'Sujit' },
    { label: 'Jeet', value: 'Jeet' }, { label: 'Ranjit', value: 'Ranjit' },
    { label: 'Pritam', value: 'Pritam' },
    { label: 'Dev', value: 'Dev' }



  ]);

  const [refreshing, setRefreshing] = React.useState(false);
  const [refreshingfl, setRefreshingfl] = React.useState(false);

  const Loader = () => {
    setRefreshing(true),
      setTimeout(() => {
        setRefreshing(false)
        setCollectionModal(true)

      }, 700);
  }

  const onRefresh = React.useCallback(() => {
    
    setRefreshing(true);
    dispatch(FetchData())
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  const onRefreshfl = (() => {
    setRefreshingfl(true);
    dispatch(FetchData())
    setTimeout(() => {
      setRefreshingfl(false);
    }, 500);
  });

  const createTestScheduler=async()=>{
    let idd=await firebase.auth().currentUser.uid;
    console.log("create new juser ",idd);

    
  }
  let Total = 0;
  let TotalExpenses = 0;
  let TotalPayments = 0;
  var currentdate = new Date();
  let AVG=0;
  var TimeStamp = currentdate.toLocaleString([], { hour12: true });
  const dispatch = useDispatch();

  const GetExpenses = async (DATA) => {
    DATA?.Expenses?.map((ele) => {
      TotalExpenses = TotalExpenses + ele.amt;
      AVG=(Number(TotalExpenses / 5)).toFixed(1);
    })
  }
  


  const GetTotalpayments = async (DATA) => {
    // console.log("GET EXPENSE IS",DATA.Expenses)
    DATA?.AllPayments?.map((ele) => {
      TotalPayments = TotalPayments + ele.amt
    })
  }

  const ConfirmSubmit = () => {
    // Loader()

    setAddModalVisible(!addmodal)
    if (marketingType == "PM") {
      CallPayingtoMess({ Name, amount, marketingType, TimeStamp, Remarks,DeviceId })
    } else if (marketingType == "MFM") {
      CallmarketingfromMessing({ Name, amount, marketingType,Remarks, TimeStamp,DeviceId  })
    } else if (marketingType == "MFS") {
      CallMarketingfromSelf({ Name, amount, marketingType,Remarks, TimeStamp, DeviceId  })
    }
  }



  const CallPayingtoMess = (PM) => {
    dispatch(payingtoMess({ PaidBy: PM.Name, amt: Number(PM.amount), Date: PM.TimeStamp, Remarks: PM.Remarks ,DeviceId:PM.DeviceId }))

    setAmount(null)
    setValue(null) //name
    setMarketingType(null)
    setRemarks(null)
    setSelected(0)
    setDeviceId(null)

    //console.log("amount and type is ",p1);

  }

  const CallmarketingfromMessing = (MFM) => {
    dispatch(marketingfromMessing({ PaidBy: MFM.Name, amt: Number(MFM.amount), Date: MFM.TimeStamp, Type: MFM.marketingType, Remarks: MFM.Remarks,DeviceId:MFM.DeviceId  }))

    setAmount(null)
    setValue(null) //name
    setMarketingType(null)
    setRemarks(null)
    setSelected(0)
    setDeviceId(null)

  }

  const CallMarketingfromSelf = (MFS) => {
    dispatch(marketingfromSelf({ PaidBy: MFS.Name, amt: Number(MFS.amount), Date: MFS.TimeStamp, Type: MFS.marketingType, Remarks: MFS.Remarks,DeviceId:MFS.DeviceId  }))

    setAmount(null)
    setValue(null) //name
    setMarketingType(null)
    setRemarks(null)
    setSelected(0)
    setDeviceId(null)

  }



  const STATE = useSelector((state) => state.users?.data)
  GetExpenses(STATE)
  GetTotalpayments(STATE)
   const Demodata = [{ "label": "sujit", "value": 10 }, { "label": "Jeet", "value": 10 }, { "label": "Ranjit", "value": 10 }, { "label": "Pritam", "value": 10 }, { "label": "Dev", "value": 10 }]
  const paymentView = (item, index) => {
    return (<>
      <TouchableOpacity

        onPress={() => {
         
        }}

        style={{ flex: 1, marginHorizontal: 0, height: 20, backgroundColor: item.index % 2 == 0 ? '#C0C0C0' : 'white', marginVertical: 2, justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text style={{ width: WIDTH * 0.03, fontSize: 15, fontWeight: 400, color: 'black', marginHorizontal: 0 }}>{item.index + 1}</Text>

        <Text style={{ width: WIDTH * 0.13, fontSize: 15, fontWeight: 600, color: 'black', marginHorizontal: 1 }}>₹{item.item.amt}</Text>
        <Text style={{ width: WIDTH * 0.15, fontSize: 17, fontWeight: 400, color: 'black', marginHorizontal: 1 }}>{item.item.PaidBy}</Text>

        <Text style={{ width: WIDTH * 0.2, fontSize: 15, fontWeight: 400, color: 'black', marginHorizontal: 1 }}>{item.item?.Remarks}</Text>

        <Text style={{ width: WIDTH * 0.32, fontSize: 15, fontWeight: 400, color: 'black', marginHorizontal: 1 }}>{item.item.Date}</Text>




      </TouchableOpacity>

    </>

    )

  }

  const ExpenseView = (item, index) => {
    return (<>
      <TouchableOpacity

        onPress={() => {
          setdetailsModal({ state: true, item: item })
        }}

        style={{ flex: 1, marginHorizontal: 0, height: 20, backgroundColor: item.index % 2 == 0 ? '#C0C0C0' : 'white', marginVertical: 2, justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text style={{ width: WIDTH * 0.03, fontSize: 15, fontWeight: 400, color: 'black', marginHorizontal: 0 }}>{item.index + 1}</Text>

        <Text style={{ width: WIDTH * 0.13, fontSize: 15, fontWeight: 600, color: 'black', marginHorizontal: 1 }}>₹{item.item.amt}</Text>
        <Text style={{ width: WIDTH * 0.15, fontSize: 17, fontWeight: 400, color: 'black', marginHorizontal: 1 }}>{item.item.PaidBy}</Text>

        <Text style={{ width: WIDTH * 0.2, fontSize: 15, fontWeight: 400, color: 'black', marginHorizontal: 1 }}>{item.item?.Remarks}</Text>

        <Text style={{ width: WIDTH * 0.32, fontSize: 15, fontWeight: 400, color: 'black', marginHorizontal: 1 }}>{item.item.Date}</Text>

      </TouchableOpacity>

    </>

    )

  }


  const ListView = ((item) => {


    return (<>
      <View style={styles.Listview}>
        <View style={styles.listimage}>
          <Image
            style={styles.listimage}
            source={{ uri: item.item?.image }}
          />

        </View>
        <View style={styles.listtext}>
           <View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{item.item.label}</Text>
          </View>
          <View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 21 }}>₹{item.item.value}</Text>
          </View>

          <View style={{height:40,width:WIDTH*0.17,alignItems:'center'}}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10}}>Balance</Text>
          <Text style={{ color:Number(item.item.value - AVG).toFixed(2)<=0 ? 'red' :'#00FF00', fontWeight: 'bold', fontSize: 16 }}>{Number(item.item.value - AVG).toFixed(2) }</Text>


            
          </View>

        </View>
        <TouchableOpacity style={styles.Detailsbutton}
          onPress={() => {
            setPaymentdata(item.item.payments)
            setModalVisible(true)

          }
          }>
          <Text style={{ fontWeight: '500', fontSize: 15 }}>Details</Text>

        </TouchableOpacity>
      </View>
    </>)
  })




  return (<>

    <View style={styles.Dash}>
         <ScrollView
        refreshControl={


          <RefreshControl
            progressBackgroundColor={'white'}
            colors={['red', 'green', 'blue']}
            refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.Dash01}>


          { !visivle ? 
          <View style={{height:250,width:250,position:'absolute',zIndex:5,justifyContent:'center',alignItems:'center',alignSelf:'center'}}> 
                <ActivityIndicator animatin={true} size={80}  color={'lightgreen'}  />
                </View>
                :<></>
  
        }
          <BarChart data={STATE?.ChartData.length!=0 ? STATE?.ChartData : Demodata}
            width={WIDTH * 0.82}
            height={HEIGHT * 0.28}
            spacing={20}

            isAnimated

            frontColor={'#177AD5'}

            yAxisTextStyle={{ color: 'white' }}
            xAxisLabelTextStyle={{ color: 'white', textAlign: 'center', fontWeight: '400', fontSize: 15 }}
            showGradient
            gradientColor={'#FFEEFE'}
            backgroundColor={Bgcolor} //7ABA78

            barWidth={40} />




        </View>
      </ScrollView>
      <View style={styles.FlatlistCont}>

        <View style={styles.Report}>

          <View style={styles.Report1}>
            <View style={[styles.Report2,]}>

              <Text style={{ color: 'white', fontSize: 15, fontWeight: '600', alignSelf: 'center' }}>Total Collection</Text>

            </View>
            <View style={styles.ReportText}>
              <Text style={{ color: 'yellow', fontSize: 20, fontWeight: '800', alignSelf: 'center' }}>{TotalPayments}</Text>


            </View>

          </View>
          <View style={styles.Report1}>
            <View style={styles.Report2}>
              <Text style={{ color: 'white', fontSize: 17, fontWeight: '500', alignSelf: 'center' }}>Expense</Text>


            </View>
            <View style={styles.ReportText}>
              <Text style={{ color: 'red', fontSize: 23, fontWeight: '800', alignSelf: 'center' }}>{TotalExpenses}</Text>


            </View>

          </View>
          <View style={styles.Report1}>
            <View style={styles.Report2}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', alignSelf: 'center' }}>Balance</Text>


            </View>
            <View style={styles.ReportText}>
              <Text style={{ color: 'lightgreen', fontSize: 23, fontWeight: '800', alignSelf: 'center' }}>{TotalPayments - TotalExpenses}</Text>


            </View>

          </View>

          <View style={styles.Report1}>
            <View style={styles.Report2}>
              <Text style={{ position: 'absolute', left: 15, top: 2, color: 'white', fontSize: 18, fontWeight: '600', alignSelf: 'center' }}>AVG</Text>


            </View>
            <View style={styles.ReportText}>
              <Text style={{ position: 'absolute', left: 5, top: 2, color: 'skyblue', fontSize: 23, fontWeight: '800', alignSelf: 'center' }}>{Number(TotalExpenses / 5).toFixed(1)}</Text>


            </View>

          </View>


        </View>

        <View

          style={{
            flexDirection: 'row', justifyContent: 'space-between',
            alignItems: 'center', paddingHorizontal: 7, height: 60,
            width: WIDTH * 0.96,
            backgroundColor: Bgcolor,
            marginVertical: 5,
            marginBottom: 20,
            borderBottomLeftRadius: 20, borderBottomRightRadius: 20
          }}>

          <View style={styles.BTNview}>
            <TouchableOpacity
              onPress={async () => {
                Loader()
              }}
              style={[styles.Add, {
                position: 'absolute',
                top: -7,
              }]}>

              <Image

                style={{ height: 30, width: 30, tintColor: 'white' }}
                source={require('./src/images/CollectionReport.png')}
              />
              <View style={{ height: 40, width: WIDTH * 0.18, alignItems: 'center', paddingTop: 5 }}>


                <Text style={{ fontSize: 12, color: 'white', fontWeight: '500', marginRight: 5, }}>Collection Report
                </Text>
              </View>

            </TouchableOpacity>
          </View>

          <View style={styles.BTNview}>
            <TouchableOpacity
              onPress={async () => {
                setExpensemodal(true)
              }}
              style={[styles.Add, {
                position: 'absolute',
                top: -7,
              }]}>

              <Image

                style={{ height: 30, width: 30, }}
                source={require('./src/images/ExpenseReport.png')}
              />
              <View style={{ height: 40, width: WIDTH * 0.15, alignItems: 'center' }}>


                <Text style={{ fontSize: 13, color: 'white', fontWeight: '400', marginRight: 5, }}>Expense Report
                </Text>
              </View>

            </TouchableOpacity>
          </View>
          <View style={styles.BTNview}>
            <TouchableOpacity
              onPress={async () => {
                createTestScheduler()

                // setAddModalVisible(true)
              }}
              style={[styles.Add, {
                position: 'absolute',
                top: -7,
              }]}>

              <Image

                style={{ height: 35, width: 35, }}
                source={require('./src/images/add3.png')}
              />
              <View style={{ height: 40, width: WIDTH * 0.15, alignItems: 'center' }}>

                <Text style={{ fontSize: 18, color: 'white', fontWeight: '500', marginRight: 5 }}>
                  Add New
                </Text>
              </View>

            </TouchableOpacity>
          </View>


        </View>

        <View style={{height:HEIGHT*0.45}}>

       
        <FlatList
        ListFooterComponent={()=>{
          return(<>
          <View style={{height:50,}}>

          </View>
          </>)
        }}

          refreshControl={


            <RefreshControl
              colors={['red', 'green', 'blue']}
              refreshing={refreshingfl} onRefresh={onRefreshfl} />
          }

          style={{ zIndex: 50 }}
          showsVerticalScrollIndicator={false}
          data={STATE?.ChartData}
          renderItem={ListView}

        />
         </View>




      </View>

      <Modal   // user payments modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>

        <View style={styles.modalView}>
          <Text style={styles.modalText}>Payments</Text>
          <View style={{ flex: 1, backgroundColor: 'white', margin: 5 }}>
            <FlatList
              data={paymentData}
              renderItem={paymentView}


            />
            {
              paymentData.map((ele) => {

                Total = Total + ele.amt;
                // console.log("ele is ", Total);


              })




            }
            <Text style={{ fontSize: 25, fontWeight: 800, color: 'black', marginHorizontal: 5, alignSelf: 'center' }}>TOTAL :  {Total}</Text>



          </View>

          <Pressable
            style={{ height: 35, width: 200, elevation: 8, backgroundColor: '#B1AFFF', alignItems: 'center', marginVertical: 15, borderRadius: 10, alignSelf: 'center' }}
            onPress={() => {
              setModalVisible(!modalVisible)

            }}>
            <Text style={{ color: 'white', fontWeight: '900', fontSize: 25, }}>Close</Text>

          </Pressable>

        </View>

      </Modal>
      <Modal   // Collection Report Modal
        animationType="none"
        transparent={true}
        visible={CollectionModal}
        onRequestClose={() => {
          setCollectionModal(!CollectionModal);
        }}>

        <View style={styles.modalView}>
          <Text style={styles.modalText}>Collections</Text>
          <View style={{ flex: 1, backgroundColor: 'white', margin: 5 }}>
            <FlatList
              data={STATE?.AllPayments}
              renderItem={paymentView}


            />
            {
              paymentData.map((ele) => {

                Total = Total + ele.amt;
                //console.log("ele is ", Total);


              })




            }
            <Text style={{ fontSize: 25, fontWeight: 800, color: 'black', marginHorizontal: 5, alignSelf: 'center' }}>TOTAL :  {TotalPayments}</Text>



          </View>

          <Pressable
            style={{ height: 35, width: 200, elevation: 8, backgroundColor: '#B1AFFF', alignItems: 'center', marginVertical: 15, borderRadius: 10, alignSelf: 'center' }}
            onPress={() => {
              setCollectionModal(!CollectionModal)

            }}>
            <Text style={{ color: 'white', fontWeight: '900', fontSize: 25, }}>Close</Text>

          </Pressable>

        </View>

      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={addmodal}
        onRequestClose={() => {
          setAddModalVisible(!addmodal);
        }}>
        <ScrollView>

          <View style={styles.Addview}>
            <Text style={styles.modalText}>ADD NEW </Text>
            <View style={{ height: HEIGHT * 0.75, marginVertical: 10, backgroundColor: '#C0C0C0' }}>
              <View style={{ height: HEIGHT * 0.06, backgroundColor: '#C0C0C0', zIndex: 5, marginVertical: 10, flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center' }}>
                <View style={{ width: WIDTH * 0.3, height: HEIGHT * 0.05, paddingLeft: 10 }}>
                  <Text style={{ color: "black", fontWeight: '500', fontSize: 24, }}>Name </Text>
                </View>
                <DropDownPicker
                  containerStyle={{
                    width: 210,

                  }}
                  textStyle={{
                    fontSize: 21,
                    color: 'black',
                    fontWeight: '500'
                  }}
                  labelStyle={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: 'grey'
                  }}
                  open={open}
                  value={Name}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
              </View>

              <View style={{
                height: HEIGHT * 0.25, backgroundColor: '#E0E0E0',
                backgroundColor: 'white',
                marginVertical: 10, paddingHorizontal: 0, borderRadius: 10
              }}>
                <View style={{ width: WIDTH * 0.4, height: HEIGHT * 0.05, alignItems: 'center', }}>
                  <Text style={{ color: "black", fontWeight: '500', fontSize: 24, alignSelf: 'center' }}>Select Type </Text>
                </View>

                <View style={{ width: WIDTH * 0.95, height: HEIGHT * 0.14, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>

                  <TouchableOpacity onPress={() => { setSelected(1), setMarketingType("PM") }}
                    style={{ width: WIDTH * 0.42, height: WIDTH * 0.17, padding: 5, borderWidth: selected == 1 ? 3 : 0, borderColor: selected == 1 ? '#CC5500' : 'pink', backgroundColor: '#66B2B2', alignItems: 'center', borderRadius: 15, margin: 5, elevation: 10, justifyContent: 'center' }}>
                    <Text style={{ color: "white", fontWeight: '600', fontSize: 17, alignSelf: 'center' }}>Paying Money to Mess </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { setSelected(2), setMarketingType("MFM") }}
                    style={{ marginVertical: 0, width: WIDTH * 0.42, padding: 5, height: WIDTH * 0.17, alignItems: 'center', backgroundColor: '#66B2B2', borderRadius: 15, margin: 5, elevation: 5, borderWidth: selected == 2 ? 3 : 0, borderColor: selected == 2 ? '#CC5500' : 'pink', }}>
                    <Text style={{ color: "white", fontWeight: '600', fontSize: 17, alignSelf: 'center' }}>Marketing from Mess Money</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.2} onPress={() => { setSelected(3), setMarketingType("MFS") }}
                    style={{ width: WIDTH * 0.42, height: WIDTH * 0.17, padding: 5, alignItems: 'center', backgroundColor: '#66B2B2', borderRadius: 15, margin: 5, elevation: 5, borderWidth: selected == 3 ? 3 : 0, borderColor: selected == 3 ? '#CC5500' : 'pink', }}>
                    <Text style={{ color: "white", fontWeight: '600', fontSize: 17, alignSelf: 'center' }}>Marketing from Own money</Text>
                  </TouchableOpacity>




                </View>



              </View>


              <View style={{ height: HEIGHT * 0.08, backgroundColor: '#C0C0C0', marginVertical: 10, paddingHorizontal: 0, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <View style={{ height: HEIGHT * 0.06, backgroundColor: 'grey', paddingHorizontal: 0, borderRadius: 10, width: WIDTH * 0.45, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 23, fontWeight: '700' }}>AMOUNT</Text>
                </View>
                <View style={{ height: HEIGHT * 0.06, paddingHorizontal: 0, borderRadius: 10, width: WIDTH * 0.45, alignItems: 'center', justifyContent: 'center' }}>
                  <TextInput
                    onChangeText={setAmount}

                    keyboardType='numeric'
                    style={{ height: HEIGHT * 0.06, width: WIDTH * 0.44, backgroundColor: 'white', fontSize: 19, color: 'red', fontWeight: '700', borderRadius: 5, borderColor: 'black', borderWidth: 1 }}></TextInput>
                </View>
              </View>


              <View style={{ height: HEIGHT * 0.13, backgroundColor: '#C0C0C0', marginVertical: 10, paddingHorizontal: 0, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
                <View style={{ height: HEIGHT * 0.08, backgroundColor: 'grey', paddingHorizontal: 0, borderRadius: 10, width: WIDTH * 0.3, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 15, fontWeight: '500', textAlign: 'center' }}>{marketingType == "PM" ? "REMARKS" : "ITEMS PURCHASED"} </Text>
                </View>
                <View style={{ height: HEIGHT * 0.1, paddingHorizontal: 0, borderRadius: 10, width: WIDTH * 0.6, alignItems: 'center', justifyContent: 'center' }}>
                  <TextInput
                    onChangeText={setRemarks}
                    multiline
                    style={{ height: HEIGHT * 0.1, width: WIDTH * 0.58, backgroundColor: 'white', fontSize: 18, borderRadius: 5, borderColor: 'black', borderWidth: 1 }}></TextInput>
                </View>
              </View>



              <View style={{ height: HEIGHT * 0.11, backgroundColor: '#C0C0C0', marginVertical: 10, paddingHorizontal: 0, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
                <View style={{ height: HEIGHT * 0.11, paddingHorizontal: 0, borderRadius: 10, width: WIDTH * 0.3, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ height: WIDTH * 0.1, backgroundColor: 'grey', paddingHorizontal: 0, borderRadius: 10, width: WIDTH * 0.1, justifyContent: 'center', alignItems: 'center' }}>
                    
                  </View>

                </View>

                <View style={{ height: HEIGHT * 0.12, paddingHorizontal: 0, borderRadius: 20, width: WIDTH * 0.6, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {imageuri != null ?
                    <Image style={{ height: WIDTH * 0.34, width: WIDTH * 0.54 }} source={{ uri: imageuri }} />

                    : <></>}

                </View>
              </View>





            </View>

            <View style={{ height: 60, width: WIDTH * 0.95, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
              <Pressable
                style={{ height: 35, width: 100, borderWidth: 3, borderColor: 'black', borderRadius: 20, backgroundColor: 'skyblue', alignItems: 'center', marginVertical: 15, borderRadius: 10, alignSelf: 'center' }}
                onPress={() => {
                  setAddModalVisible(!addmodal)

                }}>
                <Text style={{ color: 'red', fontSize: 20, fontWeight: '800' }}>Cancel</Text>

              </Pressable>
              <Pressable
                style={{ height: 35, width: 100, borderWidth: 3, borderColor: 'black', borderRadius: 20, backgroundColor: 'skyblue', alignItems: 'center', marginVertical: 15, borderRadius: 10, alignSelf: 'center' }}


                onPress={() => {
                  // console.log("REMARKS AND MARKETING TYPE IS ", Remarks, marketingType);

                  if (Name == null) {

                    ToastAndroid.show(
                      'Choose Your Name!',
                      //ToastAndroid.SHORT,
                      ToastAndroid.TOP,


                      500,
                      5000,

                    );
                  } else if (amount == null) {
                    ToastAndroid.show(
                      'Please Enter amount!',
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER,
                      5,
                      5,
                    );

                  } else if (marketingType == null) {
                    ToastAndroid.show(
                      'Please select Payment Type!',
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER,
                      5,
                      5,
                    );

                  }
                  else if ((marketingType == "MFM" || marketingType == "MFS") && Remarks == null) {
                    ToastAndroid.show(
                      'Please Enter Purchased Items ',
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER,
                      5,
                      5,
                    );

                  }
                  else {

                    Alert.alert(
                      'Are You Sure  !',
                      "Once Submited it can not be Changed ",
                      [
                        {
                          text: 'Cancel',
                          // onPress: () => Alert.alert('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'OK, Submit',
                          onPress: () => ConfirmSubmit(),

                        },
                      ],


                    )







                  }

                }}
              >
                <Text style={{ color: 'black', fontSize: 20, fontWeight: '800' }}>Submit</Text>

              </Pressable>
            </View>


          </View>
        </ScrollView>

      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={expenseModal}
        onRequestClose={() => {
          setExpensemodal(!expenseModal);
        }}>

        <View style={styles.modalView}>
          <Text style={styles.modalText}>Expense Report</Text>
          <View style={{ flex: 1, backgroundColor: 'white', margin: 5 }}>
            <View
          style={{ height:30, marginHorizontal: 0, height: 20, backgroundColor: '#C0C0C0' , marginVertical: 2, justifyContent: 'space-between', flexDirection: 'row' }}>

<Text style={{ width: WIDTH * 0.13, fontSize: 15, fontWeight: 600, color: 'black', marginHorizontal: 1,marginLeft:20 }}>amt</Text>
<Text style={{ width: WIDTH * 0.15, fontSize: 17, fontWeight: 600, color: 'black', marginHorizontal: 1 }}>By</Text>

<Text style={{ width: WIDTH * 0.2, fontSize: 15, fontWeight: 600, color: 'black', marginHorizontal: 1 }}>Remarks</Text>

<Text style={{ width: WIDTH * 0.32, fontSize: 15, fontWeight: 600, color: 'black', marginHorizontal: 1 }}>Date</Text>

          </View>

            <FlatList
              data={STATE?.Expenses}
              renderItem={ExpenseView}


            />
            {
              STATE?.Expenses.map((ele) => {

                Total = Total + ele.amt;
                //  console.log("ele is ", Total);


              })




            }
            <Text style={{ fontSize: 25, fontWeight: 800, color: 'black', marginHorizontal: 5, alignSelf: 'center' }}>TOTAL :  {Total}</Text>
{
        console.log("expense report is ",Total,TotalExpenses)

}


          </View>

          <Pressable
            style={{ height: 35, width: 200, elevation: 8, backgroundColor: '#B1AFFF', alignItems: 'center', marginVertical: 15, borderRadius: 10, alignSelf: 'center' }}
            onPress={() => {
              setExpensemodal(!expenseModal)

            }}>
            <Text style={{ color: 'white', fontWeight: '900', fontSize: 25, }}>Close</Text>

          </Pressable>

        </View>

      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={detailsModal.state}
        onRequestClose={() => {
          setdetailsModal({ state: !detailsModal, item: {} });
        }}>

        <View style={styles.modalView}>
          {/* {console.log(detailsModal.item)} */}
          <Text style={styles.modalText}>Marketing Details</Text>
          <View style={{ flex: 1, backgroundColor: 'white', margin: 5 }}>
            <View style={{ minHeight: WIDTH * 0.5, width: WIDTH * 0.9, alignSelf: 'center' }}>

              <View style={{ height: 40, width: WIDTH * 0.9, alignSelf: 'center', marginVertical: 1 ,marginTop:40}}>
              <Text style={{ fontSize: 18, fontWeight: 500, color: 'black', marginHorizontal: 5, marginLeft:5 }}>MARKETING BY :  {(detailsModal?.item?.item?.PaidBy)?.toUpperCase()}</Text>

              </View>
              <View style={{ height: 40, width: WIDTH * 0.9,  alignSelf: 'center', marginVertical: 1 }}>
              <Text style={{ fontSize: 16, fontWeight:'500', color: 'black', marginHorizontal: 5,  }}>Purchase Date : {detailsModal?.item?.item?.Date}</Text>
              </View>

              <View style={{ height: 35, width: WIDTH * 0.5, marginVertical:1}}>
              <Text style={{ fontSize: 19, fontWeight:'500', color: 'black', marginHorizontal: 5,  }}>Purchased Items:</Text>
              </View>

              <ScrollView style={{ minHeight:150,maxHeight:300, width: WIDTH * 0.9, alignSelf: 'center', marginVertical: 1 }}>
            
             
              {/* <View style={{ height: 35, width: WIDTH * 0.5, backgroundColor: 'blue', marginVertical: 5 }}> */}
              <Text style={{ fontSize: 19, fontWeight:'500', color: 'red',flexWrap:'wrap',flexDirection:'row', marginLeft:40 }}>{detailsModal?.item?.item?.Remarks}</Text>
              {/* </View> */}

              </ScrollView>

              <View style={{ height: 50, width: WIDTH * 0.9,  alignSelf: 'center', marginVertical: 5,flexDirection:'row',justifyContent:'flex-start',alignItems:'center' }}>
                            <Text style={{ fontSize: 21, fontWeight: 800, color: 'black', marginLeft:WIDTH*0.1 }}>TOTAL SPENT:</Text>
                            <Text style={{ fontSize: 26, fontWeight: 800, color: 'red', }}> ₹ {detailsModal?.item?.item?.amt}</Text>

              </View>
              

            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ height: 150, width: WIDTH * 0.8,  alignSelf: 'center', marginVertical: 5,
            flexDirection:'row',justifyContent:'flex-end',alignItems:'center',
              // position:'absolute',bottom:0,right:0,paddingHorizontal:20,
              // backgroundColor:'pink' 
              }}>
                            <Text style={{ fontSize: 10, fontWeight: 300, color: 'black',  }}>Updated By:</Text>
                            <Text style={{ fontSize: 10, fontWeight: 400, color: 'red', }}>  {detailsModal?.item?.item?.DeviceId}</Text>

              </View>
              </ScrollView>





          </View>

          <Pressable
            style={{ height: 35, width: 200, elevation: 8, backgroundColor: '#B1AFFF', alignItems: 'center', marginVertical: 15, borderRadius: 10, alignSelf: 'center' }}
            onPress={() => {
              setdetailsModal({ state: !detailsModal, item: {} })

            }}>
            <Text style={{ color: 'white', fontWeight: '900', fontSize: 25, }}>Close</Text>

          </Pressable>

        </View>

      </Modal>
      {/* </ImageBackground> */}
    </View>

  </>)
}


// modal //


const styles = StyleSheet.create({
  Dash: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: '#BFF6C3',
    justifyContent:'flex-start',
    alignItems: 'center'

  },
  modalView: {
    height: HEIGHT * 0.94,
    width: WIDTH * 0.95,
    backgroundColor: 'gray',
    alignSelf: 'center',
    marginVertical: 20,
    justifyContent: 'space-between',
    borderRadius: 20,
    elevation:5
  },
  modalText: {
    fontSize: 23,
    color: 'white',
    alignSelf: 'center'
  },

  Dash01: {
    marginTop: 10,
    borderRadius: 10,
    height: HEIGHT * 0.33,
    width: WIDTH * 0.97,
    // backgroundColor: 'blue',
    backgroundColor: '#7ABA78',

    elevation: 5,

  },
  FlatlistCont: {
    marginVertical: 0,
    borderRadius: 10,
    height: HEIGHT * 0.65,
    width: WIDTH * 0.95,
    // backgroundColor:'yellow',
    // elevation:5,
    justifyContent:'flex-start',
    alignItems: 'center'
  },
  Listview: {
    height: 65, width: WIDTH * 0.9,
    backgroundColor: Bgcolor,

    marginVertical:3,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,


  },
  listimage: {
    height: 60,
    width: 60,
    backgroundColor: '#640D6B',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white'
  },
  listtext: {
    height: 40,
    width: WIDTH * 0.5,
    alignItems: 'center',
    backgroundColor: '#B1AFFF',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around'

  },
  Detailsbutton: {
    height: 45,
    width: WIDTH * 0.15,
    marginHorizontal: 2,
    backgroundColor: '#B1AFFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  BTNview: {
    height: 50,
    // backgroundColor: 'pink',
    width: WIDTH * 0.28,
    overflow: 'hidden'
  },
  Add: {
    height: 50,

    width: WIDTH * 0.28,
    alignItems: 'center',

    backgroundColor: '#36454F',
    //  backgroundColor: 'grey',

    flexDirection: 'row',
    justifyContent: 'space-between',

    zIndex: 15,
    elevation: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: 'white',
    overflow: 'hidden'

  },
  Addview: {
    height: HEIGHT * 0.9,
    width: WIDTH * 0.95,
    backgroundColor: '#606060',
    alignSelf: 'center',
    marginVertical: 20,
    justifyContent: 'space-between',
    borderRadius: 20

  },
  Report: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WIDTH * 0.96,
    backgroundColor: '#36454F',
    alignItems: 'center',
    borderRadius: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    zIndex: -5,
    overflow: 'hidden'
  },
  Report1: {
    height: 70,
    marginHorizontal: 2,
    width: WIDTH * 0.23,
    //  backgroundColor: '#848884',

    overflow: 'hidden',
    borderRightColor: 'white', borderRightWidth: 0.5
  },
  Report2: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH * 0.25,
    // backgroundColor: 'lightgreen'
  },
  ReportText: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH * 0.25,
    // backgroundColor: 'blue'
  }
})