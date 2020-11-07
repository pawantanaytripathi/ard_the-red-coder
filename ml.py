from tensorflow.keras.models import model_from_json
import numpy as np
import sys


def names(matrix):

    # load json and create model
    file = open('cropmodel/ml/model.json', 'r')
    model_json = file.read()
    file.close()
    lmodel = model_from_json(model_json)
    # load weights
    lmodel.load_weights('cropmodel/ml/model.h5')
    lo=np.array(matrix)
    # om=lo.reshape(1,116)
    print(lo.shape)
    # aa =lmodel.predict(lo)
    # pr = np.argsort(nb[0])
    # pr
    return lo
    
    
if __name__ == '__main__':
    final = names(sys.argv)   
    print(final) 