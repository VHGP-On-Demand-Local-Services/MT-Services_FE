import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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
    if (page > 1) {
      setPage(page - 1);
    }
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
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : services && services.length > 0 ? (
        <>
          <FlatList
            data={services}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.paginationContainer}>
            {page > 1 && (
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={navigateToPreviousPage}
              >
                <Text style={styles.paginationButtonText}>Trước</Text>
              </TouchableOpacity>
            )}
            {services.length === limit && (
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={navigateToNextPage}
              >
                <Text style={styles.paginationButtonText}>Sau</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>Không có dịch vụ.</Text>
          {page > 1 && (
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={navigateToPreviousPage}
            >
              <Text style={styles.paginationButtonText}>Trước</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.container_add}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Thêm Dịch Vụ")} >
          <Ionicons name='add' style={styles.buttonText} />
        </TouchableOpacity>
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
  container_add: {
    position: 'absolute',
    bottom: 90,
    right: 30,
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
  },
  button: {
    backgroundColor: '#6fc4f2',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});