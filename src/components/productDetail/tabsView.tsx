import React from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';

interface Props {
  description: string;
}
const TabsView: React.FC<Props> = ({ description }) => {
  return (
    <section className='tab-view-section'>
      <div className='container'>
        <Tabs>
          <TabList className='nav nav-tabs'>
            <Tab className='nav-link'>DESCRIPTION</Tab>
            {/* <Tab className='nav-link'>ADDITIONAL INFORMATION</Tab>
            <Tab className='nav-link'>REVIEWS (0)</Tab> */}
          </TabList>
          <TabPanel>
            <div className='tab-content' dangerouslySetInnerHTML={{ __html: description }} />
          </TabPanel>
          {/* <TabPanel>
            <div className='tab-content'>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </p>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='tab-content'>
              <p>No Review Found!</p>
            </div>
          </TabPanel> */}
        </Tabs>
      </div>
    </section>
  );
};

export default TabsView;
