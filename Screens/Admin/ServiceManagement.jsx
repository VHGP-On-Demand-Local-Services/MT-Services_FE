import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal'
import { FlatList, StyleSheet, TouchableOpacity, View, Text, ActivityIndicator, Alert, Button } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteService, getAllService } from '../../Redux/features/ServiceSlice';

const ServiceManagement = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading, error, services } = useSelector(state => state.service.services);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const [isModalVisible, setIsMoadlVisible] = useState(false)
  const [selectServiceId, setSelectedServiceId] = useState('');

  const toggleModal = (id) => {
    setSelectedServiceId(id);
    setIsMoadlVisible(!isModalVisible);
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

  const handleDeleteService = () => {
    Alert.alert(
      'Xác Nhận',
      'Bạn muốn xóa dịch vụ này ?',
      [
        {
          text: 'Hủy',
          style: 'cancel'
        },
        {
          text: 'Đồng Ý',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteService({ id: selectServiceId }))
            setIsMoadlVisible(false)
            dispatch(getAllService({ page: page, limit: limit }))
          }
        }
      ]
    )
  }

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
          <Text style={styles.servicePrice}>{item.expected_price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh Sách Dịch Vụ</Text>
      {loading ? (
        <ActivityIndicator size='large' color='#000' />
      ) : services && services.length > 0 ? (
        <>
          <FlatList
            data={services}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            styles={styles.flatList}
          />
          <View style={styles.pagination}>
            {page > 1 &&
              <TouchableOpacity style={styles.paginationButton} onPress={navigateToPreviousPage}>
                <Ionicons name='chevron-back' style={styles.paginationButtonIcon} />
              </TouchableOpacity>
            }
            {services.length === limit && (
              <TouchableOpacity style={styles.paginationButton} onPress={navigateToNextPage}>
                <Ionicons name='chevron-forward' style={styles.paginationButtonIcon} />
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <View>
          <Text>Không có User</Text>
          {page > 1 && (
            <Button title='Trước' style={styles.paginationButton} onPress={navigateToPreviousPage} />
          )}
        </View>
      )}
      <Modal isVisible={isModalVisible} onBackdropPress={() => setIsMoadlVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Chỉnh Sửa hay Xóa?</Text>

          <TouchableOpacity style={styles.modalButtonEdit}>
            <Text style={styles.modalButtonText}>Chỉnh sửa</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalButton} onPress={handleDeleteService}>
            <Text style={styles.modalButtonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </Modal >
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  paginationButton: {
    backgroundColor: '#6fc4f2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  paginationButtonIcon: {
    color: 'white',
    fontSize: 20,
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
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignContent: 'center'

  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center'
  },
  modalButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonEdit: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});