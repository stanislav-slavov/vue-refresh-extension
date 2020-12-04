import { shallowMount } from "@vue/test-utils";
import App from "../App";

const factory = (values = {}) => {
  return shallowMount(App, {
    data() {
      return {
        ...values,
      };
    },
  });
};

describe("App", () => {
  it("renders a welcome message", () => {
    const wrapper = factory();

    expect(wrapper.find(".title").text()).toEqual(
      "Go to page by URL and configure Refresh Interval"
    );
  });

  it("New Refresh value is hidden", () => {
    const wrapper = factory({ newRefresh: "" });

    expect(wrapper.find(".new-refresh").exists()).toBeFalsy();
  });

  it("New Refresh value is shown", () => {
    const wrapper = factory({ newRefresh: "14:29:10" });

    expect(wrapper.find(".new-refresh").exists()).toBeTruthy();
  });

  it("Last Refresh value is hidden", () => {
    const wrapper = factory({ lastRefresh: "" });

    expect(wrapper.find(".last-refresh").exists()).toBeFalsy();
  });

  it("Last Refresh value is shown", () => {
    const wrapper = factory({ lastRefresh: "14:29:10" });

    expect(wrapper.find(".last-refresh").exists()).toBeTruthy();
  });
});
