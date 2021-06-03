package com.rnfilesystemproject;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import io.blackbox_vision.wheelview.view.WheelView;
//import io.blackbox_vision.wheelview.view.WheelView.OnLoopScrollListener;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
// import io.blackbox_vision.wheelview.view.LoopScrollListener;

import java.util.List;
import java.util.LinkedList;
import java.util.Map;

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

        // initial state for the component
        testList.add("Akanza 1");
        testList.add("Akanza 2");
        testList.add("Akanza 3");

        wheelView.setItems(testList);

        // registering for the itemSelect native event
        wheelView.setOnLoopScrollListener(new OnLoopScrollListener() {
            @Override
            public void onItemSelect(int item) {
                WritableMap event = Arguments.createMap();
                event.putInt("data", item);
                ((ReactContext) wheelView.getContext()).getJSModule(RCTEventEmitter.class).receiveEvent(
                wheelView.getId(), // native view and it's JS represetational view are linked with the value returned by the getId() function
                "topChange",
                event);
            }
        });

        return wheelView;
    }

    // to map the topChange event name above to the onChange callback prop in JavaScript,
    // register it by overriding the getExportedCustomBubblingEventTypeConstants method in your ViewManager:
    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
        .put(
        "topChange",
        MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", "onChange"))
        )
        .build();
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

    // 

    // this name will be used by react native to access this native view
    @Override
    public String getName() {
        return REACT_CLASS;
    }
}
