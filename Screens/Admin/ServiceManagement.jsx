import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllService } from '../../Redux/features/ServiceSlice';

const ServiceManagement = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading, error, services } = useSelector(state => state.service.services);
  const [page, setPage] = useState(1);
  const limit = 6;

  const [isShow, setIsShow] = useState(false);
  const [selectServiceId, setSelectedServiceId] = useState('');

  const toggleModal = (id) => {
    setIsShow(id);
    setSelectedServiceId(!isShow);
  };

  useEffect(() => {
    dispatch(getAllService({ page, limit }));
  }, [dispatch, page]);

  const navigateToNextPage = () => {
    setPage(page + 1);
  };

  const navigateToPreviousPage = () => {
    setPage(page - 1);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.serviceList}
        key={item._id}
        onPress={() => toggleModal(item._id)}
        onLongPress={() => toggleModal(item._id)}
      >
        <MaterialIcons name={item.icon_name} color='#333' size={46} />
        <View style={styles.serviceDetails}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.servicePrice}>{item.expected_price} VND</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh Sách Dịch Vụ</Text>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.paginationContainer}>
        {page > 1 ? (
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={navigateToPreviousPage}
          >
            <Text style={styles.paginationButtonText}>Trước</Text>
          </TouchableOpacity>
        ) : <TouchableOpacity
          style={styles.paginationButton}
          onPress={navigateToNextPage}
        >
          <Text style={styles.paginationButtonText}>Sau</Text>
        </TouchableOpacity>
        }

      </View>
    </View>
  );
};

export default ServiceManagement;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  serviceList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  serviceDetails: {
    marginLeft: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  servicePrice: {
    fontSize: 14,
    color: '#666',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  paginationButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  paginationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});