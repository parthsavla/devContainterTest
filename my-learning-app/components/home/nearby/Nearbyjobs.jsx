import { React, useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'

import styles from './nearbyjobs.style'
import { SIZES, COLORS } from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import { useRouter } from 'expo-router'
import useFetch from "../../../hook/useFetch"
const Nearbyjobs = () => {
  const router = useRouter();
  let { data, isLoading, error, reFetch } = useFetch(
    'search', {
    query: 'React',
    num_pages: '1'
  }
  )
  console.log(data.employer_logo)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>something went wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => { return (router.push(`/job-details/${job.job_id}`)) }}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default Nearbyjobs