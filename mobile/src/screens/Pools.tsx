import { useEffect } from 'react'
import { VStack, Icon } from 'native-base';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { api } from '../services/api'

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { PoolCard } from '../components/PoolCard';

export function Pools() {
  const { navigate } = useNavigation();

  async function fetchPoosl() {
    try {
      const response = await api.get('/pools')
      console.log(response.data.pools)

    } catch (error) {
        console.log(error)
    }
  }

  useEffect( () => {
    fetchPoosl()
  }, [])
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />
      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button 
          title="BUSCAR BOLÃO POR CÓDIGO" 
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
          onPress={() => navigate('find')}
        />
      </VStack>
    </VStack>
  )
}