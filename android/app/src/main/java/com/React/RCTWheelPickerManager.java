package com.rnfilesystemproject;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import io.blackbox_vision.wheelview.view.WheelView;
import com.facebook.react.bridge.ReadableArray;

import java.util.List;
import java.util.LinkedList;

// need to make a view manager class
// TODO: what will this class do ??
public class RCTWheelPickerManager extends SimpleViewManager<WheelView> {
    public static final String REACT_CLASS = "RCTWheelPicker";


    // we declare the initial state of the component and return its instance, which we want to render
    // on the react native side
    @Override
    protected WheelView createViewInstance(ThemedReactContext reactContext) {
        final WheelView wheelView = new WheelView(reactContext);
        List<String> testList = new LinkedList<>();

        testList.add("Akanza 1");
        testList.add("Akanza 2");
        testList.add("Akanza 3");

        wheelView.setItems(testList);
        return wheelView;
    }

    // adding data prop
    // this function will be called when the prop value changes
    @ReactProp(name = "data")
    public void setData(WheelView wheelView, ReadableArray data) {
        List<String> dataList = new LinkedList<>();
        for (int i = 0; i < data.size() ; i++) {
            dataList.add(data.getString(i));
        }
        wheelView.setItems(dataList);
    }

    // this name will be used by react native to access this native view
    @Override
    public String getName() {
        return REACT_CLASS;
    }
}
