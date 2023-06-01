import { View, Text,SafeAreaView,ScrollView,ActivityIndicator,RefreshControl } from 'react-native'
import {useCallback,useState} from 'react'
import { Stack,useRouter,useSearchParams } from 'expo-router'
import { Company,JobAbout,JobFooter,JobTabs,ScreenHeaderBtn,Specifics } from '../../components'
import { COLORS,icons,SIZES } from '../../constants'
import useFetch from '../../hook/useFetch'

const tabs = ["About","Qaulifications","Responsibilities"];

export default function JobDetails() {
    const params = useSearchParams();
    const router = useRouter();
    const {data,isLoading,error,refetch}=useFetch('job-details',{job_id:params.id})
    const [refreshing,setRefreshing] = useState(false);
    const [activeTab,setActiveTab] = useState(tabs[0]);
    const onRefresh = ()=>{};

    const displayTabContent = (activeTab)=>{
        switch (activeTab) {
            case "Qaulifications":
                <Specifics 
                    title="Qaulifications"
                    points={data[0].jobs_highlights?.qualifications?? ['N/A']}/>
                break;
            case "About":
                
                break;
            case "Responsibilities":
                break;
            default:
                break;
        }
    }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>
      <Stack.Screen
        options={{
            headerStyle:{backgroundColor:COLORS.lightWhite},
            headerShadowVisible:false,
            headerBackVisible:false,
                      headerLeft:()=>{
            return(<ScreenHeaderBtn iconUrl={icons.left} dimension="60%" handlePress={()=>router.back()}/>)
          },
          headerRight:()=>{
            return(<ScreenHeaderBtn iconUrl={icons.share} dimension="60%"/>)
          },
          headerTitle:"",
        }}
      ></Stack.Screen>
      <>
        <ScrollView 
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        >
            {isLoading?
            (<ActivityIndicator size={'large'} color={COLORS.primary}/>):
            error?
            (<Text>Something went wrong</Text>):
            data.length === 0 ?
            (<Text>No Data</Text>):
            (
                <View style={{pading:SIZES.medium,paddingBottom:100}}>
                    <Company
                        companyLogo={data[0].employer_logo}
                        jobTitle={data[0].job_title}
                        companyName={data[0].employer_name}
                        Location={data[0].job_country}
                    />
                    <JobTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    {
                        displayTabContent(setActiveTab)
                    }
                </View>
            )
            }
        </ScrollView>
      </>
    </SafeAreaView>
  )
}