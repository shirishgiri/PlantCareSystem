from keras.layers import Dense
import tensorflow as tf

old_dense_init = Dense.__init__
def new_dense_init(self, *args, **kwargs):
    kwargs.pop('quantization_config', None)
    return old_dense_init(self, *args, **kwargs)
Dense.__init__ = new_dense_init

model = tf.keras.models.load_model('model/plant_disease_detection.keras', compile=False)